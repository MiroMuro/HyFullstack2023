const { v4: uuidv4 } = require("uuid");
import data from "../../patients";
import { EntryWithoutId } from "../interfaces/entry";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
} from "../interfaces/patient";
import { parseDiagnosisCodes } from "../utils";
const patientList: Patient[] = data;

const newId: string = uuidv4() as string;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientList.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  }));
};

const getPatients = (): Patient[] => {
  return patientList;
};

const findById = (id: string): Patient | undefined => {
  const patient = patientList.find((patient) => patient.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): NewPatient => {
  const newPatient = {
    id: newId,
    ...patient,
  };

  patientList.push(newPatient);

  return newPatient;
};

const updatePatientEntries = (
  patientId: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const patient = findById(patientId);
  if (patient) {
    const newEntry = {
      id: newId,
      diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
      ...entry,
    };
    patient.entries.push(newEntry);
    return patient;
  }
  return undefined;
};

export default {
  getNonSensitivePatients,
  getPatients,
  findById,
  addPatient,
  updatePatientEntries,
};
