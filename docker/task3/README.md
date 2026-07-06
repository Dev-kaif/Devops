# Dockerfile Practice Task 3 — TypeScript API, Multi-Stage Build, Non-Root Runtime

You are given a Node.js + TypeScript backend API.

## Project structure

```text
orders-api/
├── src/
│   ├── server.ts
│   ├── routes/
│   │   └── orders.ts
│   └── services/
│       └── orderService.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env
├── .git/
├── node_modules/
├── dist/
├── coverage/
└── README.md
```

The `package.json`:

```json
{
  "name": "orders-api",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest"
  },
  "dependencies": {
    "express": "^5.0.0",
    "pg": "^8.13.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^3.0.0"
  }
}
```

The application listens like this:

```ts
const PORT = process.env.PORT || 4000;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Orders API running on ${PORT}`);
});
```

Running:

```bash
npm run build
```

generates:

```text
dist/
├── server.js
├── routes/
│   └── orders.js
└── services/
    └── orderService.js
```

## Your task

Create a **production-oriented multi-stage Dockerfile**.

This time, think carefully about what belongs in the builder versus the runtime image.

### Requirements

1. Use exactly **two stages**:

```text
Stage 1 → compile TypeScript
Stage 2 → run compiled JavaScript
```

2. Name the first stage:

```text
builder
```

3. Both stages must use:

```text
node:22-alpine
```

4. Both stages must use:

```text
/app
```

as their working directory.

5. Optimize dependency caching. Changing only:

```text
src/routes/orders.ts
```

must not rerun dependency installation if package files are unchanged.

6. In the builder stage, install everything required to compile TypeScript.

Think carefully:

```text
typescript
@types/node
@types/express
```

are in `devDependencies`.

7. Copy the project files required for compilation.

8. Compile TypeScript using the package script.

Expected output:

```text
/app/dist
```

9. The final runtime image must **not contain**:

```text
src/
TypeScript compiler
tsx
vitest
@types/*
builder node_modules
.env
.git/
coverage/
README.md
```

10. The runtime stage must contain production dependencies:

```text
express
pg
```

But must not contain development dependencies.

You need to decide how to install runtime dependencies efficiently.

11. Copy only the compiled output from the builder stage using:

```text
COPY --from=builder
```

12. Set:

```text
NODE_ENV=production
```

13. The final application must run as a **non-root user**.

Important clue: the official Node image already provides a built-in user intended for this purpose.

Do not create your own Linux user for this task.

14. Document the application's container port:

```text
4000
```

15. Add a Docker `HEALTHCHECK`.

The health check should test:

```text
http://localhost:4000/health
```

Use these settings:

```text
interval     → 30 seconds
timeout      → 3 seconds
start period → 10 seconds
retries      → 3
```

Important constraint: `node:22-alpine` does not guarantee that `curl` is available.

Think about how you can perform an HTTP health check using something already available in the runtime image.

16. Start the API using:

```bash
npm start
```

Use exec form.

17. Create `.dockerignore` excluding at minimum:

```text
node_modules/
dist/
.env
.git/
coverage/
README.md
```

18. Build image:

```text
orders-api:3.0
```

19. Run container:

```text
detached mode
container name → orders-api-prod

host port 9000
      ↓
container port 4000
```

20. Verify from host:

```bash
curl localhost:9000/health
```

Expected:

```json
{
  "status": "ok"
}
```

## Constraints

```text
✅ Exactly two stages
✅ Multi-stage required
✅ Non-root runtime required
✅ HEALTHCHECK required
✅ COPY --from=builder required

❌ No Docker Compose
❌ No database container
❌ No bind mounts
❌ No named volumes
❌ Do not install curl
❌ Do not install wget
❌ Do not create a custom Linux user
```

## What to submit

```text
1. Dockerfile

2. .dockerignore

3. docker build command

4. docker run command
```

### Two conceptual traps in this task

**Trap 1 — Builder dependencies**

If you do this in the builder:

```dockerfile
RUN npm ci --omit=dev
```

ask yourself:

> Where will the TypeScript compiler come from?

**Trap 2 — Runtime dependencies**

If you simply copy this:

```text
builder /app/node_modules
        ↓
runtime /app/node_modules
```
