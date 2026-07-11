# Docker Compose - Runtime

## Concepts Covered

- command
- entrypoint
- working_dir
- restart
- profiles

---

# command

Overrides the image's default `CMD`.

```yaml
command:
  - npm
  - start
```

Equivalent CLI

```bash
docker run node:22-alpine npm start
```

Use `command` when you want to change **what** the container runs.

---

# entrypoint

Overrides the image's `ENTRYPOINT`.

```yaml
entrypoint:
  - npm
```

Unlike `command`, the entrypoint defines the executable that always starts.

Arguments are typically supplied through `command`.

Example

```yaml
entrypoint:
  - npm

command:
  - run
  - worker
```

Final command

```text
npm run worker
```

---

# command vs entrypoint

Image

```dockerfile
ENTRYPOINT ["npm"]
CMD ["start"]
```

Compose

```yaml
entrypoint:
  - npm

command:
  - run
  - worker
```

Result

```text
npm run worker
```

Think of it as:

```text
ENTRYPOINT + CMD

↓

ENTRYPOINT + command
```

---

# working_dir

Sets the default working directory inside the container.

```yaml
working_dir: /app
```

Equivalent CLI

```bash
docker run -w /app
```

Instead of

```text
/
```

the process starts in

```text
/app
```

---

# restart

Configure when Docker automatically restarts a container.

```yaml
restart: always
```

Available policies

```text
no
always
on-failure
unless-stopped
```

Meaning

| Policy | Description |
|---------|-------------|
| no | Never restart |
| always | Always restart |
| on-failure | Restart only when the process exits with an error |
| unless-stopped | Restart until manually stopped |

---

# profiles

Start services only when a profile is enabled.

```yaml
profiles:
  - monitoring
```

Normal

```bash
docker compose up
```

Monitoring service is skipped.

Enable profile

```bash
docker compose --profile monitoring up
```

Now it starts.

Useful for

- Monitoring
- Development-only tools
- Debug containers
- Admin dashboards

---

# Architecture

```
Container Starts
        │
        ▼
ENTRYPOINT
        │
        ▼
command
        │
        ▼
Application
```

Profiles

```
docker compose up
        │
        ▼
Core Services

docker compose --profile monitoring up
        │
        ▼
Core Services
+
Monitoring
```

---

# Useful Commands

Start development profile

```bash
docker compose --profile development up
```

Start monitoring profile

```bash
docker compose --profile monitoring up
```

Restart containers

```bash
docker compose restart
```

---

# Common Mistakes

❌ Thinking `command` replaces the image's ENTRYPOINT.

It replaces only the image's CMD.

---

❌ Using `entrypoint` when `command` is enough.

Most applications only need `command`.

---

❌ Forgetting that `working_dir` affects relative paths.

Commands like

```text
npm start
```

run relative to the working directory.

---

❌ Using `restart: always` for development.

This can make debugging harder because the container restarts immediately after crashing.

---

# Interview Notes

### Q. Difference between `CMD` and `ENTRYPOINT`?

`ENTRYPOINT`

Defines the executable.

`CMD`

Provides default arguments.

---

### Q. Difference between `command` and `entrypoint` in Compose?

`command`

Overrides the image's CMD.

`entrypoint`

Overrides the image's ENTRYPOINT.

---

### Q. When should you use `profiles`?

When some services should only run in specific scenarios such as development, monitoring, or debugging.

---

### Q. Which restart policy is commonly used in production?

Usually

```text
unless-stopped
```

because containers restart automatically after crashes or host reboots, but stop if explicitly stopped by an operator.