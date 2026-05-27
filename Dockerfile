FROM oven/bun:1-debian

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production

COPY . .

CMD ["bun", "run", "src/app.ts"] 