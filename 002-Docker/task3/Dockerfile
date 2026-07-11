FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine AS Production

WORKDIR /app

# Change ownership of copied package files from the default root user
# to the built-in node user and node group
COPY --chown=node:node package*.json .

RUN npm ci --omit=dev

COPY --from=builder --chown=node:node /app/dist /app/dist

ENV NODE_ENV=production

EXPOSE 4000

# Run the application process as the built-in non-root node user
USER node

HEALTHCHECK \
    --interval=30s \
    --timeout=3s \
    --start-period=10s \
    --retries=3 \
    CMD node -e "require('http').get('http://localhost:4000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"


CMD [ "npm","start" ]





