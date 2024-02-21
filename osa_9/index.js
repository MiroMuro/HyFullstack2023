import express from "express";
import { bmiCalc } from "./bmiCalculator";
import { calcExercises } from "./excerciseCalculator";
const app = express();
app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
    try {
        const weight = String(req.query.weight);
        const height = String(req.query.height);
        res.send(bmiCalc([height, weight]));
    }
    catch (error) {
        let errorMessage = "";
        if (error instanceof Error) {
            errorMessage += "malformatted parameters";
        }
        res.send({ error: errorMessage });
    }
});
app.use(express.json());
app.post("/exercises", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.send(calcExercises(daily_exercises, target));
    }
    catch (error) {
        let errorMessage = "";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.send({ error: errorMessage });
    }
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});
