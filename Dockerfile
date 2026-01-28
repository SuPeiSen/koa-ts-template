# syntax=docker/dockerfile:1.6
# 使用 BuildKit 特性：RUN --mount=type=cache
# 构建建议：DOCKER_BUILDKIT=1 docker build -t your-image .

# =========================
# 1) 构建阶段（builder）
# =========================
FROM node:20-alpine AS builder
WORKDIR /app

# 关键点 1：使用 corepack 固定 pnpm 版本，避免 pnpm install 过程中自举/切换版本导致写 .tools
# 你也可以把 10.13.1 换成你项目实际使用的版本（建议与本地一致）
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

RUN npm i -g koa-typescript-cli --registry=https://registry.npmmirror.com

# 关键点 2：明确只拷贝 pnpm 需要的文件，避免 package-lock.json 混入
COPY package.json pnpm-lock.yaml ./

# 关键点 3：缓存 PNPM_HOME（包含 store + .tools 等），而不只是 store 子目录
# 并且设置 sharing=locked 防止并发构建时 cache 被互相破坏
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN --mount=type=cache,id=pnpm-home,target=/pnpm,sharing=locked \
    pnpm install --frozen-lockfile

# 再拷贝业务代码（最大化依赖层缓存命中）
COPY . .

# Prisma 生成（如使用）
RUN pnpm exec prisma generate

# 构建
RUN pnpm run build:dev


# =========================
# 2) 运行阶段（runtime）
# =========================
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# 同样用 corepack 固定 pnpm 版本，保证与 builder 一致
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# 运行阶段同样只拷贝 package.json + pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 复用同一个 pnpm-home 缓存（仍然 sharing=locked）
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN --mount=type=cache,id=pnpm-home,target=/pnpm,sharing=locked \
    pnpm install --prod --frozen-lockfile \
    && pnpm store prune

# 拷贝构建产物
COPY --from=builder /app/build .

CMD ["node", "index.js"]
