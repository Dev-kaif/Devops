# Docker Compose - Production

## Concepts Covered

- include
- labels
- annotations
- logging
- secrets
- configs
- resource limits

---

# include

Merge multiple Compose files into a single Compose application.

```yaml
include:
  - ./monitoring/compose.yaml
  - ./logging/compose.yaml
```

Useful when splitting a large project into multiple Compose files.

---

# labels

Attach metadata to Docker resources.

```yaml
labels:
  app: backend
  team: platform
```

Common uses

- Reverse proxies
- Monitoring
- Automation
- Filtering

---

# annotations

Attach metadata for humans and external tools.

```yaml
annotations:
  owner: kaif
```

Unlike labels,

annotations are not commonly used in Docker.

They are much more common in Kubernetes.

---

# logging

Configure how Docker stores container logs.

```yaml
logging:
  driver: json-file

  options:
    max-size: "10m"
    max-file: "5"
```

Useful for preventing logs from consuming excessive disk space.

---

# secrets

Provide sensitive information securely.

```yaml
secrets:
  - db_password
```

Declaration

```yaml
secrets:

  db_password:
    file: ./secrets/db_password.txt
```

Secrets are mounted as files inside the container.

Avoid storing passwords directly in compose.yaml.

---

# Resource Limits

Limit CPU and memory usage.

```yaml
mem_limit: 2g
cpus: 2
```

Useful when multiple containers share the same machine.

---

# Architecture

```
Compose

      │

      ├──────── include
      │
      ▼

Application

      │

      ├──────── labels
      ├──────── annotations
      ├──────── logging
      ├──────── secrets
      ├──────── configs
      └──────── resource limits
```

---

# Common Mistakes

❌ Putting passwords directly into compose.yaml.

Use secrets instead.

---

❌ Allowing logs to grow without limits.

Configure log rotation.

---

❌ Confusing labels with annotations.

Labels

- Used by Docker tooling.

Annotations

- Mostly documentation and external metadata.

---

# Interview Notes

### Q. Difference between labels and annotations?

Labels

- Used by Docker and third-party tooling.

Annotations

- Metadata for humans and external systems.

---

### Q. Why use secrets instead of environment variables?

Secrets avoid placing sensitive values directly in Compose files and are mounted separately inside the container.

---

### Q. When should you split Compose files?

When the application grows large enough that a single compose.yaml becomes difficult to manage.