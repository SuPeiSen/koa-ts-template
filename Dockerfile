# 使用Node官方的LTS版作为基础镜像
FROM node:20-alpine AS builder

# 创建app目录
WORKDIR /app

# # 安装app依赖
# # 使用通配符确保既拷贝了package.json又拷贝了package-lock.json（如果存在）
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm koa-typescript-cli

RUN pnpm i

# 将应用源代码拷贝到容器内
COPY --chown=node:node . .

RUN npm run build


FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/build ./build
# 只复制生产依赖项到生产阶段的容器中
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm install pnpm pm2 -g

# 如果您使用pnpm用于生产环境的依赖安装，可以使用`pnpm install --prod`或`pnpm install --only=production`
RUN pnpm install --prod

# # 创建并设置日志目录权限
RUN mkdir -p /app/.pm2 && chown -R node:node /app/.pm2

USER node

CMD ["pm2-runtime", "start", "./build/ecosystem.config.js"]
