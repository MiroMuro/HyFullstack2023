import express from "express";
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged here...");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
