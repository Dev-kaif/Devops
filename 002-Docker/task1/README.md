## Dockerfile Practice Task 1 — Containerize a Node.js API

You are given a small Node.js backend application.

### Project structure

```text
user-api/
├── src/
│   ├── server.js
│   └── users.js
├── package.json
├── package-lock.json
├── .env
├── README.md
└── logs/
    └── app.log
```

The application starts with:

```bash
npm start
```

The `package.json` contains:

```json
{
  "name": "user-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js"
  },
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "eslint": "^9.0.0"
  }
}
```

The server code behaves roughly like this:

```js
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "User API running"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
```

## Your task

Create a production-oriented `Dockerfile` for this application.

Your Dockerfile must satisfy **all** of these requirements:

1. Use an official lightweight Node.js image based on Alpine Linux, with Node.js version `22`.

2. Set the container working directory to:

```text
/app
```

3. Install dependencies efficiently for Docker layer caching. A source-code change such as:

```text
src/server.js
```

should **not** force Docker to reinstall all npm dependencies if `package.json` and `package-lock.json` are unchanged.

4. Use the lockfile-based clean installation command intended for reproducible dependency installation.

5. The final production image must **not contain development dependencies** such as:

```text
nodemon
eslint
```

6. Copy the application source code into the image.

7. The following must **not** be copied into the image:

```text
node_modules/
.env
.git/
logs/
README.md
```

You will need to decide whether this belongs entirely in the Dockerfile or whether another Docker-related file is appropriate.

8. The application must run with:

```text
NODE_ENV=production
```

9. Document that the application expects container port:

```text
3000
```

10. Start the application using the package script:

```bash
npm start
```

11. The application process should receive termination signals correctly. In other words, avoid unnecessarily wrapping the main process in an extra shell.

12. Build the image with this tag:

```text
user-api:1.0
```

13. Run the container in detached mode with:

```text
host port 8080
        ↓
container port 3000
```

and give the container the name:

```text
user-api-prod
```

14. Verify it using:

```bash
curl localhost:8080
```

Expected response:

```json
{
  "message": "User API running"
}
```

### What you need to submit

1. Dockerfile

2. .dockerignore

3. The docker build and docker run commands