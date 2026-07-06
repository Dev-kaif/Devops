FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS Production

WORKDIR /app

# COPY --from=builder /app/node_modules /app/node_modules

COPY --chown=node:node package*.json .

RUN npm ci --omit=dev

COPY --from=builder --chown=node:node /app/dist /app/dist

USER node

ENV NODE_ENV=production

EXPOSE 4000

HEALTHCHECK \
    --interval=30s \
    --timeout=3s \
    --start-period=10s \
    --retries=3 \
    CMD node -e "require('http').get('http://localhost:4000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"


CMD [ "npm","start" ]





