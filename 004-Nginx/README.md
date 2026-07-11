# Nginx Reference

A structured reference for learning **Nginx** from the ground up.

This repository covers everything from the core architecture to production-ready reverse proxy configurations.

---

# What is Nginx?

NGINX (pronounced **Engine-X**) is a high-performance web server that can also act as a:

- Web Server
- Reverse Proxy
- Load Balancer
- HTTP Cache
- SSL/TLS Terminator
- API Gateway (basic)
- Kubernetes Ingress Controller

Unlike traditional web servers that create a thread/process for every client, Nginx uses an **event-driven, asynchronous architecture**, allowing a small number of worker processes to handle thousands of concurrent connections efficiently.

---

# Functionalities

![NGINX Functionalities](images/functionalities.png)

NGINX is commonly used for:

- Reverse Proxy
- Load Balancing
- SSL/TLS Termination
- Static File Hosting
- Caching
- Compression (Gzip)
- Request Routing
- Security

---

# Request Flow

```text
                Client (Browser)
                        │
                        ▼
                  ┌────────────┐
                  │   NGINX    │
                  └─────┬──────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   Backend 1       Backend 2       Backend 3
```

Instead of clients communicating directly with backend servers, every request first reaches **NGINX**, which decides where to forward it.

---

# Why use Nginx?

Without Nginx

```text
Browser
    │
    ├────────► Backend 1
    ├────────► Backend 2
    └────────► Backend 3
```

Problems

- No load balancing
- No centralized SSL
- No request routing
- No caching
- Larger attack surface

---

With Nginx

```text
Browser
      │
      ▼
    NGINX
      │
 ┌────┴────┐
 ▼    ▼    ▼
API1 API2 API3
```

Benefits

- Single entry point
- Load balancing
- HTTPS termination
- Better security
- Centralized routing
- Easier scaling

---

# Load Balancing Algorithms

![Algorithms](images/algorithms.png)

Common algorithms include:

- Round Robin *(default)*
- Least Connections
- IP Hash
- Weighted Round Robin
- Weighted Least Connections

Each algorithm is suited for different traffic patterns and server capacities.

---

# Repository Structure

```text
.
├── README.md
│
├── 01-basics/
├── 02-reverse-proxy/
├── 03-load-balancing/
├── 04-static-files/
├── 05-https/
├── 06-security/
├── 07-production/
└── 08-commands/
```

Each folder contains:

- `README.md`
- `nginx.conf`
- Example configurations

Every concept is explained only once when first introduced.

---

# Learning Roadmap

## 01 - Basics

Topics

- Directives
- Contexts
- Worker Processes
- Worker Connections
- MIME Types

---

## 02 - Reverse Proxy

Topics

- `proxy_pass`
- `proxy_set_header`
- Request Headers
- Response Flow

---

## 03 - Load Balancing

Topics

- `upstream`
- Round Robin
- Least Connections
- IP Hash
- Weighted Algorithms

---

## 04 - Static Files

Topics

- `root`
- `alias`
- `index`
- `try_files`
- MIME Types

---

## 05 - HTTPS

Topics

- SSL/TLS
- Certificates
- HTTP → HTTPS Redirect
- TLS Termination

---

## 06 - Security

Topics

- Security Headers
- Gzip
- Rate Limiting
- Caching
- Access Control

---

## 07 - Production

Topics

- Logging
- Timeouts
- Buffering
- Performance Tuning
- Best Practices

---

## 08 - Commands

Useful Nginx CLI commands.

---

# Prerequisites

Before using this repository you should already understand:

- Linux
- Docker
- Docker Compose
- HTTP Basics

---
