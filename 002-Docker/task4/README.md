# Dockerfile Practice Task 4 — NestJS Production Container

You are given a NestJS API written in TypeScript.

## Project structure

```text
payments-api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── payments/
│   │   ├── payments.controller.ts
│   │   ├── payments.service.ts
│   │   └── payments.module.ts
│   └── health/
│       └── health.controller.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── package-lock.json
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── .env
├── .git/
├── node_modules/
├── dist/
├── coverage/
└── README.md
```

The application listens on:

```ts
const port = process.env.PORT || 5000;

await app.listen(port, "0.0.0.0");
```

The health endpoint is:

```text
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

The `package.json` is:

```json
{
  "name": "payments-api",
  "version": "1.0.0",
  "scripts": {
    "build": "nest build",
    "start": "node dist/main.js",
    "start:dev": "nest start --watch",
    "prisma:generate": "prisma generate",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@prisma/client": "^6.0.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/testing": "^11.0.0",
    "@types/node": "^22.0.0",
    "jest": "^30.0.0",
    "prisma": "^6.0.0",
    "typescript": "^5.0.0"
  }
}
```

## Production requirements

Your team wants a production Docker image with these properties:

- Use `node:22-alpine`.
- The final image must run compiled JavaScript, not TypeScript.
- The final image must not contain `src/`, tests, coverage, `.env`, `.git`, README, Nest CLI, Jest, or TypeScript.
- The app must run with production-only npm dependencies.
- The final process must run as the built-in non-root `node` user.
- The container listens on port `5000`.
- Add a health check for `GET /health`.
- Do not install `curl` or `wget`.
- Use exactly two stages.
- Optimize Docker layer caching.
- Use `npm ci`.
- Use `COPY --from=builder`.

## The Prisma complication

This is the part I want you to reason through.

The application imports:

```ts
import { PrismaClient } from "@prisma/client";
```

The Prisma client must be generated before the application runs.

You have:

```text
prisma/schema.prisma
```

and the generation command is:

```bash
npm run prisma:generate
```

But notice:

```text
prisma
```

CLI is in:

```text
devDependencies
```

while:

```text
@prisma/client
```

is in:

```text
dependencies
```

Your Dockerfile must ensure the generated Prisma client is available in the final runtime container **without keeping the Prisma CLI as a production dependency**.

I’m deliberately not telling you where to run generation or what exactly must be copied. Reason it out.

## Runtime configuration

The application needs:

```text
DATABASE_URL
```

But you must **not** bake it into the image.

So this is forbidden:

```dockerfile
ENV DATABASE_URL=postgresql://user:password@host/db
```

The value should be supplied when the container starts.

## Your deliverables

Submit:

```text
1. Dockerfile

2. .dockerignore

3. docker build command

4. docker run command
```

Build tag:

```text
payments-api:4.0
```

Run requirements:

```text
detached mode
container name → payments-api-prod

host port 9500
      ↓
container port 5000
```

At runtime, pass:

```text
DATABASE_URL=postgresql://app:secret@db.example.com:5432/payments
```

For this mock task, treat that URL as a placeholder.

## Verification

```bash
curl localhost:9500/health
```

Expected:

```json
{
  "status": "ok"
}
```
