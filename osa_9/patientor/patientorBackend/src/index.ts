import express from "express";
import diagnosisRouter from "./routes/diagnosisRoute";
import patientRouter from "./routes/patientRoute";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("Someone pinged here...");
  res.send("pong");
});
app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
