import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";
import { isEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (_req, res) => {
  console.log("HERRO");
  console.log(_req.body);

  try {
    const newPatient = toNewPatient(_req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
router.post("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    res.status(400).send("Patient not found");
  } else if (!isEntry(req.body)) {
    res.status(400).send("Invalid entry");
  } else {
    const newEntry = req.body;
    const updatedPatientEntries = patientService.updatePatientEntries(
      patient.id,
      newEntry
    );
    res.status(200).json(updatedPatientEntries);
  }
});

export default router;
