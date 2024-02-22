import data from "../../patients";
import { Patient, NonSensitivePatient } from "../interfaces/patient";

const patientList: Patient[] = data;

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

export default {
  getNonSensitivePatients,
  getPatients,
};
