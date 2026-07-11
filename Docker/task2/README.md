# Dockerfile Practice Task 2 — Production React Build with Multi-Stage Docker

You are given a React + Vite application.

## Project structure

```text
dashboard-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
│       └── Dashboard.jsx
├── public/
│   └── logo.svg
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .env
├── .git/
├── node_modules/
├── dist/
└── README.md
```

The `package.json` is:

```json
{
  "name": "dashboard-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^7.0.0",
    "eslint": "^9.0.0"
  }
}
```

Running:

```bash
npm run build
```

generates:

```text
dist/
├── index.html
└── assets/
    ├── index-a8f3.js
    └── index-b91c.css
```

The final production container should **not run Node.js**. It should serve the static `dist/` files using [nginx](https://nginx.org/?utm_source=chatgpt.com).

## Your task

Create a production-oriented **multi-stage Dockerfile** satisfying all requirements:

1. Use exactly **two stages**:

```text
Stage 1 → build React app
Stage 2 → serve static files
```

2. Name the first stage:

```text
builder
```

3. Stage 1 must use:

```text
Node.js 22 Alpine
```

4. Stage 1 working directory:

```text
/app
```

5. Optimize dependency caching. Changing only:

```text
src/App.jsx
```

must **not** rerun dependency installation if the package files are unchanged.

6. Use the reproducible lockfile-based npm installation command.

Important: unlike Task 1, think carefully before using:

```bash
npm ci --omit=dev
```

Ask yourself:

> Is Vite required while building?

7. Copy the required project files into the builder stage.

8. Build the production frontend using the package script.

Expected generated directory:

```text
/app/dist
```

9. Stage 2 must use the official lightweight Alpine-based Nginx image.

10. The final image must contain only what it needs to serve the built frontend. Do **not** copy:

```text
node_modules/
src/
package.json
package-lock.json
vite.config.js
Node.js runtime
```

into the final stage.

11. Copy build artifacts from the `builder` stage into Nginx’s default static web root:

```text
/usr/share/nginx/html
```

12. Document the correct Nginx container port.

13. Start Nginx in the foreground.

Important: containers need a foreground process to stay alive.

14. Create a `.dockerignore` that excludes at minimum:

```text
node_modules/
dist/
.git/
.env
README.md
```

15. Build the image with tag:

```text
dashboard-app:2.0
```

16. Run the container:

```text
detached mode
container name → dashboard-prod

host port 8080
      ↓
container Nginx port
```

17. Verify:

```bash
curl localhost:8080
```

You should receive the built `index.html`.

## Constraints

```text
✅ Multi-stage build required
✅ Exactly two stages
✅ Must use COPY --from=builder
❌ No Docker Compose
❌ No bind mounts
❌ No named volumes
❌ No custom nginx.conf
```

## What to submit

Send me exactly:

```text
1. Dockerfile

2. .dockerignore

3. docker build command

4. docker run command
```

One important hint only:

```text
Builder stage:
source code + Node + npm + Vite
            ↓
         npm build
            ↓
          /app/dist


Final stage:
Nginx only
    ↑
copy /app/dist from builder
```

