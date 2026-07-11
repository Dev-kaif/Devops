# Docker Compose - Advanced

## Concepts Covered

- platforms
- cache_from
- cache_to
- hostname
- aliases
- tty
- stdin_open
- tmpfs

---

# platforms

Build an image for one or more CPU architectures.

```yaml
build:
  platforms:
    - linux/amd64
    - linux/arm64
```

Common platforms

```text
linux/amd64
linux/arm64
```

Useful when:

- Building on Apple Silicon (M1/M2/M3)
- Publishing multi-platform images
- Cross-platform CI/CD

---

# cache_from

Import an existing build cache.

```yaml
cache_from:
  - backend-api:latest
```

Useful for:

- GitHub Actions
- GitLab CI
- Faster rebuilds

---

# cache_to

Export build cache for future builds.

```yaml
cache_to:
  - type=inline
```

Often used together with `cache_from`.

---

# hostname

Assign a custom hostname inside the container.

```yaml
hostname: backend-api
```

Instead of Docker generating one automatically, the container identifies itself using this hostname.

---

# aliases

Assign additional DNS names to a service on a Docker network.

```yaml
networks:
  default:
    aliases:
      - api
      - backend
```

Containers on the same network can connect using:

```text
api

or

backend
```

instead of only the service name.

---

# tty

Allocate a pseudo terminal.

```yaml
tty: true
```

Useful for:

- Interactive applications
- Development containers
- Debugging

Equivalent CLI

```bash
docker run -t
```

---

# stdin_open

Keep STDIN open even when no terminal is attached.

```yaml
stdin_open: true
```

Useful for:

- Interactive shells
- REPLs
- Debug sessions

Equivalent CLI

```bash
docker run -i
```

---

# tmpfs

Mount temporary storage in RAM.

```yaml
tmpfs:
  - /tmp
```

Characteristics

- Stored in memory
- Faster than disk
- Deleted when the container stops

Useful for:

- Temporary files
- Caches
- Sensitive runtime data

---

# Architecture

```
Container

│

├── hostname

├── aliases

├── tty

├── stdin_open

├── tmpfs

└── Build

      ├── platforms

      ├── cache_from

      └── cache_to
```

---

# Common Mistakes

❌ Using `platforms` without Buildx support.

Multi-platform builds typically require Docker Buildx.

---

❌ Thinking `hostname` changes the service name.

It only changes the hostname inside the container.

---

❌ Assuming `tmpfs` persists after the container stops.

It is memory-backed storage and is removed when the container exits.

---

# Interview Notes

### Q. What is `tmpfs`?

A RAM-backed filesystem mounted inside the container.

---

### Q. Why use `cache_from` and `cache_to`?

To reuse Docker build cache and significantly speed up CI/CD builds.

---

### Q. Difference between a service name and a hostname?

**Service name**

- Used by Docker Compose for service discovery on the network.

**Hostname**

- The hostname seen from inside the container.

---

### Q. When would you use `platforms`?

When building images for multiple CPU architectures, such as `linux/amd64` and `linux/arm64`.
