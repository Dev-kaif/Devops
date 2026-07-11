FROM node:22-alpine AS frontend-builder

WORKDIR /app/frontend/

COPY /frontend/package*.json .

RUN npm ci

COPY /frontend .

ARG VITE_API_URL

RUN VITE_API_URL=$VITE_API_URL npm run build

# ========================================

FROM node:22-alpine AS backend-builder

WORKDIR /app/backend

COPY /backend/package*.json .

RUN npm ci

COPY /backend .

RUN npm run build

# ========================================

FROM node:22-alpine AS production

WORKDIR /app

COPY --chown=node:node --from=backend-builder /app/backend/package*.json .

RUN npm ci --omit=dev

COPY --chown=node:node --from=frontend-builder /app/frontend/dist /app/public

COPY --chown=node:node --from=backend-builder /app/backend/dist /app/dist

ENV NODE_ENV=production

USER node

EXPOSE 7000

CMD [ "npm","start" ]
