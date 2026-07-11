# Docker Compose - Storage

## Concepts Covered

- volumes
- bind mounts
- named volumes
- long syntax

---

# volumes

Mount storage into a container.

There are two common types:

- Bind Mounts
- Named Volumes

---

# Bind Mount

Mount a directory from the host into the container.

```yaml
volumes:
  - ./src:/app/src
```

Format

```text
HOST_PATH:CONTAINER_PATH
```

Example

```text
Host
./src
    │
    ▼
Container
/app/src
```

Changes made on the host immediately appear inside the container.

Commonly used for:

- Local development
- Hot reload
- Source code

---

# Named Volume

Store persistent data managed by Docker.

```yaml
volumes:
  - mongodb-data:/data/db
```

Format

```text
VOLUME_NAME:CONTAINER_PATH
```

Example

```text
Docker Volume

mongodb-data
      │
      ▼
Container

/data/db
```

Unlike bind mounts,

Docker decides where the data is stored.

Useful for

- Databases
- Redis
- PostgreSQL
- MySQL

---

# Long Syntax

Instead of

```yaml
volumes:
  - ./src:/app/src
```

you can write

```yaml
volumes:
  - type: bind
    source: ./src
    target: /app/src
```

or

```yaml
volumes:
  - type: volume
    source: mongodb-data
    target: /data/db
```

The long syntax is useful when additional options are required.

Example

```yaml
read_only: true
```

---

# Declaring Named Volumes

Named volumes must be declared.

```yaml
volumes:

  mongodb-data:
```

Compose automatically creates them if they do not exist.

---

# Architecture

Bind Mount

```text
Host Folder
      │
      ▼
Container
```

Named Volume

```text
Docker Volume
      │
      ▼
Container
```

---

# Useful Commands

Create a volume

```bash
docker volume create my-volume
```

List volumes

```bash
docker volume ls
```

Inspect a volume

```bash
docker volume inspect mongodb-data
```

Remove unused volumes

```bash
docker volume prune
```

---

# Common Mistakes

❌ Thinking bind mounts persist independently of the host.

They simply mirror the host directory.

---

❌ Forgetting to declare named volumes.

```yaml
volumes:

  mongodb-data:
```

---

❌ Using bind mounts for database storage in production.

Named volumes are generally the better choice.

---

# Interview Notes

### Q. Difference between a bind mount and a named volume?

Bind Mount

- Uses a host directory.

Named Volume

- Managed by Docker.

---

### Q. When should you use a bind mount?

During development for source code and hot reload.

---

### Q. When should you use a named volume?

For persistent application data such as databases.