FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run prisma:generate

RUN npm run build


FROM node:22-alpine as production

WORKDIR /app

COPY --chown=node:node package*.json .

COPY --chown=node:node --from=builder /app/dist /app/dist

RUN npm ci --omit=dev

COPY --from=builder --chown=node:node /app/node_modules/.prisma /app/node_modules/.prisma

EXPOSE 5000

USER node

HEALTHCHECK \
    --interval=30s \
    --timeout=3s \
    --start-period=10s \
    --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"


CMD [ "npm","start" ]

