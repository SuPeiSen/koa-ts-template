# ====== 构建阶段 ======
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm koa-typescript-cli --registry=https://registry.npmmirror.com
RUN pnpm install --frozen-lockfile

COPY . .
RUN npm run build

# ====== 运行阶段 ======
FROM node:20-alpine
WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm --registry=https://registry.npmmirror.com \
    && pnpm install --prod --frozen-lockfile \
    && pnpm store prune \
    && rm -rf /root/.npm /root/.pnpm-store \
    && npx modclean -r

COPY --from=builder /app/build ./build

CMD ["node", "build/index.js"]
