# Docker Compose - Basics

## Concepts Covered

- `name`
- `services`
- `image`
- `build`
- `context`
- `container_name`
- `ports`

---

# name

Defines the Compose project name.

All resources (containers, networks, volumes, etc.) created by this Compose file are grouped under this project.

```yaml
name: compose-basics
```

Without `name`:

```text
my-folder-nginx-server-1
```

With `name`:

```text
compose-basics-nginx-server-1
```

### Why use it?

- Gives predictable resource names.
- Makes multiple Compose projects easier to manage.
- Prevents naming conflicts.

---

# services

A Compose application consists of one or more services.

Each service describes **how a container should be created and run**.

```yaml
services:
  nginx:

  redis:

  api:
```

A service can define things such as:

- image
- build
- ports
- volumes
- environment
- networks

A service generally creates one container.

---

# image

Uses an existing image from a container registry (Docker Hub by default).

```yaml
image: nginx:alpine
```

Equivalent CLI:

```bash
docker run nginx:alpine
```

### When should I use `image`?

Use `image` when the image already exists.

Examples:

- nginx
- redis
- postgres
- mongo

---

# build

Builds an image from a Dockerfile.

```yaml
build:
  context: .
```

Equivalent CLI:

```bash
docker build .
```

Use `build` when you're building **your own application**.

Examples:

- Node.js API
- React app
- FastAPI app
- NestJS app

---

# context

Defines the directory sent to Docker during the build.

Docker looks for a `Dockerfile` inside this directory unless another Dockerfile is specified.

```yaml
build:
  context: .
```

Equivalent CLI:

```bash
docker build .
```

Another example:

```yaml
context: ./backend
```

Equivalent CLI:

```bash
docker build ./backend
```

---

# container_name

Assigns a custom name to the container.

```yaml
container_name: api
```

Otherwise Compose generates one automatically.

Example:

```text
compose-basics-api-1
```

### Should I always use it?

No.

Most production Compose files let Docker generate names automatically.

Use it when you want an easy-to-remember container name while learning or developing.

---

# ports

Publishes a container port to the host machine.

Format:

```text
HOST_PORT:CONTAINER_PORT
```

Example:

```yaml
ports:
  - "8080:80"
```

Equivalent CLI:

```bash
docker run -p 8080:80 nginx
```

Architecture:

```text
Browser
      │
localhost:8080
      │
Host Port
      │
Container Port 80
      │
Nginx
```

---

# Commands

Start containers

```bash
docker compose up
```

Start in detached mode

```bash
docker compose up -d
```

Stop and remove containers

```bash
docker compose down
```

List running containers

```bash
docker compose ps
```

View logs

```bash
docker compose logs
```

List images

```bash
docker compose images
```

---

# Common Mistakes

❌ Thinking `build` and `image` are the same.

- `image` pulls or uses an existing image.
- `build` creates a new image from a Dockerfile.

❌ Thinking `context` is the Dockerfile path.

`context` is the build directory.

The Dockerfile is searched for **inside** that directory by default.

❌ Mixing up host and container ports.

```text
8080:80

8080 → Host

80 → Container
```

---

# Interview Notes

### Q. Difference between `image` and `build`?

**image**

Use an existing image.

**build**

Create a new image from a Dockerfile.

---

### Q. What is the build context?

The directory Docker sends to the Docker daemon during a build. Docker searches this directory for the Dockerfile (unless another Dockerfile is specified) and can only access files inside the build context.

---

### Q. What is the format of `ports`?

```text
HOST_PORT:CONTAINER_PORT
```

Example:

```text
8080:80
```

This maps port **8080 on the host** to port **80 inside the container**.
