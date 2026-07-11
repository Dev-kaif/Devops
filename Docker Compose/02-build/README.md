# Docker Compose - Build

## Concepts Covered

- `build`
- `context`
- `dockerfile`
- `target`
- `args`
- `pull`
- `image`
- `additional_contexts`

---

# build

Builds a Docker image from a Dockerfile.

```yaml
build:
  context: .
```

Equivalent CLI

```bash
docker build .
```

Use `build` when creating images for your own applications.

Examples:

- Node.js API
- FastAPI
- React
- NestJS

---

# image

Assigns a name/tag to the built image.

```yaml
image: backend-api:2.0
```

Equivalent CLI

```bash
docker build -t backend-api:2.0 .
```

Without `image`, Compose generates an image name automatically.

---

# context

Defines the directory sent to Docker during the build.

Docker can only access files inside this directory.

```yaml
context: ./backend
```

Equivalent CLI

```bash
docker build ./backend
```

---

# dockerfile

Use a Dockerfile other than the default `Dockerfile`.

```yaml
dockerfile: Dockerfile.prod
```

Equivalent CLI

```bash
docker build -f Dockerfile.prod .
```

Useful when maintaining different Dockerfiles for development and production.

---

# target

Build only a specific stage from a multi-stage Dockerfile.

Dockerfile

```dockerfile
FROM node AS builder

FROM builder AS testing

FROM builder AS production
```

Compose

```yaml
target: production
```

Equivalent CLI

```bash
docker build --target production .
```

Without `target`, Docker builds the final stage by default.

---

# args

Pass values to Dockerfile `ARG` instructions.

Dockerfile

```dockerfile
ARG NODE_VERSION
```

Compose

```yaml
args:
  NODE_VERSION: 22
```

Equivalent CLI

```bash
docker build \
--build-arg NODE_VERSION=22 .
```

Unlike environment variables, `ARG` values exist only during the image build.

---

# pull

Always check the registry for newer versions of the base image before building.

```yaml
pull: true
```

Equivalent CLI

```bash
docker build --pull .
```

Useful for ensuring builds use the latest patched base image.

---

# additional_contexts

Makes additional build contexts available during a build.

```yaml
additional_contexts:
  shared_base: ./shared
```

Can be used with:

- another local directory
- a Git repository
- another Compose service

This is an advanced feature commonly used in large monorepos and complex BuildKit workflows.

---

# Common Mistakes

❌ Thinking `context` is the Dockerfile.

`context` is the directory.

`dockerfile` is the file inside that directory.

---

❌ Thinking `target` is required for every multi-stage build.

It is only needed when you want to build a stage other than the final one.

---

❌ Confusing `ARG` with environment variables.

`ARG`

- Available only while building the image.

`ENV`

- Available when the container is running.

---

# Interview Notes

### Q. Difference between `build` and `image`?

`build`

Creates an image from a Dockerfile.

`image`

Uses or tags an image.

---

### Q. Difference between `ARG` and `ENV`?

`ARG`

Build-time only.

`ENV`

Runtime environment variable.

---

### Q. What is the build context?

The directory sent to Docker during the build.

Docker cannot access files outside the build context.

---

### Q. When is `target` useful?

When a Dockerfile contains multiple final stages and you want to build one of them instead of the default final stage.