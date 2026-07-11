FROM node:22-alpine AS builder

WORKDIR /app

# Separate dependency installation from source code
# so dependency layers can be cached
COPY package-*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine AS production

# Nginx's default static file serving directory
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80

# Run Nginx in the foreground so the container stays alive
CMD ["nginx", "-g", "daemon off;"]

