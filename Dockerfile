FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

# 复制依赖文件并安装依赖
COPY . .

RUN pnpm install --frozen-lockfile
RUN node scripts/build.cjs

# 运行阶段
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 仅复制构建产物
COPY --from=builder /app/server/dist/ ./

# 暴露端口
EXPOSE 24500

# 启动命令
CMD ["node", "app.cjs"]