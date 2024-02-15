import express from "express";
import { bmiCalc } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  try {
    let weight: string = String(req.query.weight);
    let height: string = String(req.query.height);
    res.send(bmiCalc([height, weight]));
  } catch (error: unknown) {
    res.send({ error: "malformatted parameters" });
  }
});
const PORT: number = 3003;
app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
