const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = 3000;
const INDEX_FILE = path.join(__dirname, "../html/index.html");


const appName = process.env.APP_NAME || "backend";

const DB_URL = process.env.DB_URL;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const MONGO_URI =
  process.env.MONGO_URI ||
  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DB_URL}:27017`;

const client = new MongoClient(MONGO_URI);

const DB_NAME = "demo";
const COLLECTION = "requests";

let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(DB_NAME);
    collection = db.collection(COLLECTION);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

const server = http.createServer((req, res) => {
  // Serve frontend
  if (req.method === "GET" && req.url === "/") {
    fs.readFile(INDEX_FILE, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Could not load index.html");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

    return;
  }

  // Get all data
  if (req.method === "GET" && req.url === "/api/data") {
    (async () => {
      try {
        const data = await collection.find().toArray();

        res.writeHead(200, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            success: false,
            error: err.message,
          }),
        );
      }
    })();

    return;
  }

  // Insert data
  if (req.method === "POST" && req.url === "/api/data") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const json = JSON.parse(body);

        const document = {
          ...json,
          appName,
          createdAt: new Date(),
        };

        const result = await collection.insertOne(document);

        console.log("Inserted:", result.insertedId);

        res.writeHead(201, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            success: true,
            id: result.insertedId,
            data: document,
          }),
        );
      } catch (err) {
        console.error(err);

        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            success: false,
            error: err.message,
          }),
        );
      }
    });

    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
