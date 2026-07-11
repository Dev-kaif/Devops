# Dockerfile Practice Task 7 — Production Hardening & Graceful Shutdown

You are given a Node.js + Fastify + TypeScript API.

## Project structure

```text id="b4j6sc"
notifications-api/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── routes/
│   │   └── notifications.ts
│   └── services/
│       └── email.ts
├── scripts/
│   └── download-assets.js
├── assets/
│   └── templates.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env
├── .npmrc
├── .git/
├── node_modules/
├── dist/
├── coverage/
└── README.md
```

The `package.json`:

```json id="9eqb9w"
{
  "name": "notifications-api",
  "version": "1.0.0",
  "scripts": {
    "postinstall": "node scripts/download-assets.js",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest"
  },
  "dependencies": {
    "fastify": "^5.0.0",
    "pino": "^9.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.0.0",
    "vitest": "^3.0.0"
  }
}
```

The application listens on:

```ts id="73en5f"
const port = Number(process.env.PORT || 6000);

await app.listen({
  port,
  host: "0.0.0.0",
});
```

Health endpoint:

```text id="h9xgse"
GET /health
```

Expected:

```json id="9urj17"
{
  "status": "ok"
}
```

## Graceful shutdown code

The application already contains:

```ts id="j12ckw"
const shutdown = async (signal: string) => {
  app.log.info({ signal }, "shutdown started");

  await app.close();

  process.exit(0);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
```

So your container setup must allow the Node process to receive signals properly.

## The `.npmrc` complication

The project contains:

```text id="rfj7zz"
.npmrc
```

with:

```text id="2r3e2f"
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

The token is needed only during dependency installation.

It must **not** exist in:

```text id="stjlnc"
final image
Dockerfile ENV
Dockerfile ARG
image history
```

Assume the build environment supports Docker BuildKit secrets.

## The lifecycle-script complication

Running:

```bash id="p61d8n"
npm ci
```

automatically executes:

```text id="v2o8br"
postinstall
```

which runs:

```bash id="fsvv7d"
node scripts/download-assets.js
```

The script needs:

```text id="ec5cpi"
scripts/download-assets.js
```

to exist at installation time.

It generates/updates:

```text id="qq32xm"
assets/templates.json
```

The production runtime needs that generated asset.

## The broken Dockerfile

```dockerfile id="tr7o9k"
FROM node:22-alpine

WORKDIR /app

COPY . .

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

RUN npm ci

RUN npm run build

RUN npm prune --omit=dev

EXPOSE 6000

CMD npm start
```

This image builds in some environments, but your security review rejects it.

## Your task

Replace it with a production-oriented Dockerfile.

### Requirements

Use exactly **two stages**:

```text id="1x5o4y"
builder
production
```

Both use:

```text id="q7xy5j"
node:22-alpine
```

Both use:

```text id="p3s89d"
/app
```

as `WORKDIR`.

### Builder requirements

Optimize caching as much as reasonably possible.

Use:

```text id="h8p1gr"
npm ci
```

The private registry token must be mounted as a BuildKit secret.

Use secret ID:

```text id="uvmlc7"
npm_token
```

Do not use:

```text id="h4f88x"
ARG NPM_TOKEN
ENV NPM_TOKEN
```

The `.npmrc` file must not be copied into the final image.

Remember that `npm ci` triggers `postinstall`, and `postinstall` needs:

```text id="k1fbld"
scripts/download-assets.js
```

So your caching order must account for that.

Compile TypeScript.

Expected:

```text id="ivzq46"
/app/dist
```

### Production requirements

Install only production dependencies.

Do not copy builder `node_modules`.

The production dependency installation may also need registry authentication, so use the BuildKit secret there too.

The final image must contain:

```text id="f9d1rm"
/app/dist
/app/assets/templates.json
/app/node_modules
/app/package.json
/app/package-lock.json
```

The final image must not contain:

```text id="p7k3ry"
src/
scripts/
.npmrc
.env
.git/
coverage/
README.md
TypeScript
Vitest
builder node_modules
NPM token
```

Set:

```text id="hrx0p2"
NODE_ENV=production
```

Run as the built-in:

```text id="b4sp74"
node
```

user.

Document port:

```text id="yvvk4k"
6000
```

Add a health check:

```text id="ccv40o"
GET http://localhost:6000/health
```

Use Node’s built-in HTTP module.

Settings:

```text id="5pfgm6"
interval     30s
timeout      3s
start period 10s
retries      3
```

### PID 1 / signal requirement

Use exec-form:

```text id="13g05w"
CMD ["npm", "start"]
```

Do not use shell form:

```text id="f3x8x4"
CMD npm start
```

For this exercise, assume this is sufficient for the provided graceful shutdown code.

## `.dockerignore`

Exclude at minimum:

```text id="9yhy5v"
node_modules/
dist/
.env
.git/
coverage/
README.md
```

Important: think carefully before excluding:

```text id="fl6kqw"
.npmrc
scripts/
assets/
```

because the build may need some of them.

## Build command

Build:

```text id="8bl8t5"
notifications-api:7.0
```

Provide the secret from a host environment variable:

```text id="ky2dlp"
NPM_TOKEN
```

Use BuildKit secret syntax.

## Run command

```text id="i43cxi"
detached mode
container name → notifications-api-prod

host port 9600
      ↓
container port 6000
```

## Verification

```bash id="xk7ivl"
curl localhost:9600/health
```

Then test graceful stop:

```bash id="twug65"
docker stop notifications-api-prod
```

The app should receive:

```text id="hmr6k2"
SIGTERM
```

and execute its shutdown handler.

## Deliverables

Send:

```text id="28ihbw"
1. Dockerfile

2. .dockerignore

3. docker build command

4. docker run command
```
