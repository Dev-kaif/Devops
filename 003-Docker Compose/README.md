# Docker Compose Reference

A structured reference for learning Docker Compose from the ground up.

The repository is organized by concepts making it easier to understand and revisit specific topics.

---

# Practice with Real Docker Compose Projects

After completing this reference, read and analyze real-world Compose files.

Repository:

```text
https://github.com/docker/awesome-compose
```

---

# Learning Roadmap

## 01 - Basics

Learn the foundation of Docker Compose.

Topics

- `name`
- `services`
- `image`
- `build`
- `context`
- `container_name`
- `ports`

---

## 02 - Build

Learn how Compose builds Docker images.

Topics

- `dockerfile`
- `target`
- `args`
- `pull`
- `additional_contexts`

---

## 03 - Networking

Learn how containers communicate.

Topics

- `networks`
- `expose`
- `depends_on`
- `healthcheck`

---

## 04 - Storage

Learn persistent storage.

Topics

- Bind Mounts
- Named Volumes
- Long Syntax

---

## 05 - Environment

Learn configuration and environment variables.

Topics

- `environment`
- `.env`
- `env_file`
- Variable Interpolation

---

## 06 - Runtime

Learn container runtime behaviour.

Topics

- `command`
- `entrypoint`
- `working_dir`
- `restart`
- `profiles`

---

## 07 - Production

Production-oriented Compose features.

Topics

- `include`
- `labels`
- `annotations`
- `logging`
- `secrets`
- Resource Limits

---

## 08 - Advanced

Advanced Compose features.

Topics

- `platforms`
- `cache_from`
- `cache_to`
- `hostname`
- `aliases`
- `tty`
- `stdin_open`
- `tmpfs`

---

# Repository Structure

```text
.
├── README.md
├── COMMANDS.md
│
├── 01-basics/
├── 02-build/
├── 03-networking/
├── 04-storage/
├── 05-environment/
├── 06-runtime/
├── 07-production/
└── 08-advanced/
```

Each folder contains

- `compose.yaml`
- `README.md`

Every concept is explained only once when first introduced.

---

# Learning Philosophy

This repository is designed to teach Docker Compose progressively.

Each folder introduces new concepts without repeating previous ones.

Every keyword includes:

- Explanation
- Usage
- CLI equivalent (when applicable)
- Common mistakes
- Interview notes

---

# Prerequisites

Before using this repository you should already understand:

- Docker Images
- Docker Containers
- Dockerfile
- Volumes
- Docker Networking

---

# Next Steps

After finishing this repository, a natural progression is:

```text
Docker Compose

↓

Kubernetes

↓

Helm

↓

Terraform

↓

CI/CD

↓

AWS

↓

Prometheus

↓

Grafana
```