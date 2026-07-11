# Docker Compose - Environment Variables

## Concepts Covered

- environment
- .env
- env_file
- variable interpolation
- precedence

---

# environment

Define environment variables explicitly.

```yaml
environment:
  NODE_ENV: production
  PORT: 3000
```

These variables become available inside the container.

Example

```
process.env.NODE_ENV
```

---

# .env

Compose automatically reads the `.env` file located beside `compose.yaml`.

Example

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

Compose can use these values for interpolation.

Example

```yaml
environment:
  DATABASE_HOST: ${DATABASE_HOST}
```

Compose replaces

```
${DATABASE_HOST}
```

with

```
localhost
```

before creating the container.

---

# env_file

Load environment variables directly into the container.

```yaml
env_file:
  - ./app.env
```

Example

```text
app.env

REDIS_HOST=redis
REDIS_PORT=6379
```

These variables become environment variables inside the container.

---

# Variable Interpolation

Compose replaces

```text
${VARIABLE}
```

using values from:

- `.env`
- current shell environment

Example

```yaml
environment:
  DB_HOST: ${DATABASE_HOST}
```

---

# Combining env_file and environment

```yaml
env_file:
  - ./app.env

environment:
  APP_MODE: production
```

If both define

```
APP_MODE
```

the value under

```yaml
environment:
```

wins.

---

# Architecture

Compose

```
.env
   │
   ▼
Compose
   │
${DATABASE_HOST}
   │
environment
   │
Container
```

env_file

```
app.env
     │
     ▼
env_file
     │
Container
```

---

# Useful Commands

Show container environment

```bash
docker compose exec backend env
```

Print one variable

```bash
docker compose exec backend printenv DATABASE_HOST
```

---

# Common Mistakes

❌ Thinking `.env` and `env_file` are the same.

`.env`

- Used by Compose.

`env_file`

- Passed into the container.

---

❌ Thinking `${VARIABLE}` reads from `env_file`.

It does not.

Compose only uses:

- `.env`
- shell environment

for interpolation.

---

❌ Hardcoding secrets inside compose.yaml.

Prefer

- `.env`
- `env_file`
- Docker Secrets (production)

---

# Interview Notes

### Q. Difference between `.env` and `env_file`?

`.env`

Used by Compose for variable interpolation.

`env_file`

Injects variables into the container.

---

### Q. Which has higher priority?

If the same variable exists in both

```yaml
environment:
```

and

```yaml
env_file:
```

the value in

```yaml
environment:
```

takes precedence.

---

### Q. Can Compose automatically read `.env`?

Yes.

If `.env` is in the same directory as `compose.yaml`, Compose loads it automatically.