# Docker Compose - Networking

## Concepts Covered

- expose
- networks
- depends_on
- healthcheck

---

# expose

Expose a container port only to other containers.

```yaml
expose:
  - "3000"
```

Unlike `ports`, this does **not** publish the port to your host.

Architecture

```
Container A
      │
backend:3000
      │
Container B

Host
❌ cannot access
```

---

# networks

Compose automatically creates a default network for every project.

You can explicitly define networks to isolate communication between services.

```yaml
networks:
  - backend-network
```

A service can belong to multiple networks.

```yaml
networks:
  - frontend-network
  - backend-network
```

Containers communicate using service names.

Example

```
mongodb:27017
```

---

# depends_on

Controls startup dependencies between services.

Short syntax

```yaml
depends_on:
  - mongodb
```

Only guarantees startup order.

---

Long syntax

```yaml
depends_on:
  mongodb:
    condition: service_healthy
```

Waits until the dependency passes its health check.

Available conditions:

```yaml
condition: service_started
condition: service_healthy
condition: service_completed_successfully
```

---

# healthcheck

Docker periodically executes a command inside the container.

```yaml
healthcheck:
  test:
```

Exit code

```
0
```

→ Healthy

Non-zero

```
1
```

→ Unhealthy

Example

```yaml
healthcheck:
  test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
```

---

# Architecture

```
Browser
      │
localhost:8080
      │
Frontend
      │
frontend-network
      │
Backend
      │
backend-network
      │
MongoDB

Mongo Express
      │
backend-network
```

---

# Common Mistakes

❌ Thinking `depends_on` waits for the application to become ready.

It only waits for the container to start.

Use

```yaml
condition: service_healthy
```

to wait for readiness.

---

❌ Thinking `expose` publishes ports.

It does not.

Only `ports` publishes to the host.

---

❌ Thinking every service needs its own network.

Usually a few shared networks are enough.

---

# Interview Notes

### Q. Difference between `ports` and `expose`?

`ports`

Host ↔ Container

`expose`

Container ↔ Container

---

### Q. Difference between short and long `depends_on`?

Short

Only startup order.

Long

Can wait for health checks.

---

### Q. Can a service belong to multiple networks?

Yes.

This allows it to communicate with services on multiple isolated networks.
