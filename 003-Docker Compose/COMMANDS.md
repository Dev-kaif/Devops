# Docker Compose Commands

---

# Start Services

Create and start all services.

```bash
docker compose up
```

Create and start all services in detached mode.

```bash
docker compose up -d
```

Rebuild images before starting services.

```bash
docker compose up --build
```

Rebuild images and start services in detached mode.

```bash
docker compose up -d --build
```

---

# Stop Services

Stop and remove containers and Compose networks.

```bash
docker compose down
```

Stop and remove containers, networks and named volumes.

```bash
docker compose down -v
```

Stop running containers without removing them.

```bash
docker compose stop
```

Start previously stopped containers.

```bash
docker compose start
```

Restart running containers.

```bash
docker compose restart
```

---

# Build Images

Build all services that define `build:`.

```bash
docker compose build
```

Pull newer versions of service images.

```bash
docker compose pull
```

---

# View Services

List running services.

```bash
docker compose ps
```

List running and stopped services.

```bash
docker compose ps -a
```

List Compose projects.

```bash
docker compose ls
```

---

# View Logs

Show logs from all services.

```bash
docker compose logs
```

Show logs from a specific service.

```bash
docker compose logs <service-name>
```

Follow logs in real time.

```bash
docker compose logs -f
```

Follow logs from a specific service.

```bash
docker compose logs -f <service-name>
```

---

# Execute Commands

Run a command inside a running service container.

```bash
docker compose exec <service-name> <command>
```

Example

```bash
docker compose exec backend npm run migrate
```

Open an interactive shell.

```bash
docker compose exec backend sh
```

---

# Inspect Configuration

Display the fully resolved Compose configuration.

```bash
docker compose config
```

Useful for debugging:

- Variable interpolation
- Merged Compose files
- Final generated configuration

---

# Common Workflow

```bash
# Build images
docker compose build

# Start services
docker compose up -d

# View running services
docker compose ps

# Follow logs
docker compose logs -f

# Execute commands
docker compose exec backend sh

# Stop everything
docker compose down
```