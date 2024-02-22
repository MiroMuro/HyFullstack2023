const { v4: uuidv4 } = require("uuid");
import data from "../../patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
} from "../interfaces/patient";

const patientList: Patient[] = data;
const id: string = uuidv4();
const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientList.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
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
    id: id,
    ...patient,
  };

  patientList.push(newPatient);

  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatients,
  findById,
  addPatient,
};
