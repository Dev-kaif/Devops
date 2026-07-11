const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const INDEX_FILE = path.join(__dirname, "./index.html");

const appName = process.env.APP_NAME;

const server = http.createServer((req, res) => {
  fs.readFile(INDEX_FILE, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Could not load index.html");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    console.log(`This req was served by ${appName}`);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
