# Dockerfile Practice Task 6 — Build-Time vs Runtime Configuration

You are given a full-stack application with two separate directories:

```text
customer-portal/
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── api.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   └── routes/
│   │       └── customers.ts
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── .env
├── .git/
├── README.md
└── Dockerfile
```

The frontend uses Vite and React.

The backend uses Node.js + TypeScript.

## Frontend behavior

Inside:

```text
frontend/src/api.ts
```

you have:

```ts
export const API_URL = import.meta.env.VITE_API_URL;
```

The frontend build command:

```bash
npm run build
```

creates:

```text
frontend/dist/
```

Important fact:

> `VITE_API_URL` is needed at **build time**.

Vite embeds it into the generated browser JavaScript.

## Backend behavior

The backend reads:

```ts
const port = process.env.PORT || 7000;
const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
```

Backend build:

```bash
npm run build
```

creates:

```text
backend/dist/
```

Backend start:

```bash
npm start
```

runs:

```text
node dist/server.js
```

Important fact:

> `DATABASE_URL` and `JWT_SECRET` are needed at **runtime**.

They must not be baked into the image.

## Your task

Create one production Dockerfile that builds and runs the backend while also building the frontend.

The backend serves the built frontend files from:

```text
/app/public
```

So the final runtime image should conceptually contain:

```text
/app/
├── dist/
│   └── server.js
├── public/
│   ├── index.html
│   └── assets/
├── node_modules/
├── package.json
└── package-lock.json
```

## Requirements

Use exactly **three stages**:

```text
Stage 1 → frontend-builder
Stage 2 → backend-builder
Stage 3 → production
```

Use:

```text
node:22-alpine
```

for all three stages.

### Frontend builder

Name the stage:

```text
frontend-builder
```

Use:

```text
/app/frontend
```

as `WORKDIR`.

Optimize dependency caching.

Install dependencies using:

```text
npm ci
```

Accept a build argument named:

```text
VITE_API_URL
```

The build must make this value available to Vite during:

```bash
npm run build
```

Build output:

```text
/app/frontend/dist
```

### Backend builder

Name the stage:

```text
backend-builder
```

Use:

```text
/app/backend
```

as `WORKDIR`.

Optimize dependency caching.

Install all dependencies needed to compile TypeScript.

Build output:

```text
/app/backend/dist
```

### Production stage

Name it:

```text
production
```

Use:

```text
/app
```

as `WORKDIR`.

Install only backend production dependencies.

Do not copy builder `node_modules`.

Copy compiled backend output into:

```text
/app/dist
```

Copy frontend build output into:

```text
/app/public
```

Set:

```text
NODE_ENV=production
```

The backend listens on:

```text
7000
```

Run the final process as the built-in:

```text
node
```

user.

Start using:

```bash
npm start
```

Use exec-form `CMD`.

## Security requirements

This is the important part.

You may use:

```text
ARG VITE_API_URL
```

because it is public frontend configuration.

You must not put these anywhere in the Dockerfile:

```text
DATABASE_URL
JWT_SECRET
```

Do not use:

```dockerfile
ARG JWT_SECRET
ENV JWT_SECRET=...
ARG DATABASE_URL
ENV DATABASE_URL=...
```

They must be supplied only when the container starts.

Also:

```text
.env
```

must not enter the build context.

## Build requirement

Build image:

```text
customer-portal:6.0
```

At build time provide:

```text
VITE_API_URL=https://api.example.com
```

## Run requirement

Run:

```text
detached mode

container name:
customer-portal-prod

host port 9700
      ↓
container port 7000
```

At runtime provide:

```text
DATABASE_URL=postgresql://app:secret@db.example.com:5432/customers

JWT_SECRET=super-secret-runtime-value
```

## `.dockerignore`

Exclude at minimum:

```text
frontend/node_modules/
frontend/dist/

backend/node_modules/
backend/dist/

.env
.git/
README.md
```

## Deliverables

Send:

```text
1. Dockerfile

2. .dockerignore

3. docker build command

4. docker run command
```

### Main conceptual test

You need to understand this distinction:

```text
VITE_API_URL
    ↓
needed while building frontend
    ↓
ARG / build-time configuration
    ↓
embedded into browser JS
    ↓
not secret


DATABASE_URL + JWT_SECRET
    ↓
needed when backend process runs
    ↓
runtime environment variables
    ↓
passed to docker run
    ↓
must not be baked into image
```

