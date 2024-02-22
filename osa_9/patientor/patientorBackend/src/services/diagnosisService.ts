import diagnosisData from "../../diagnoses";
import Diagnose from "../interfaces/diagnosis";

const diagnoses: Diagnose[] = diagnosisData;

const getDiagnoses = () => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis,
};
