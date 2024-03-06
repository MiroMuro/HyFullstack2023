import AddHealthcheckEntryForm from "./AddHealthcheckEntryForm";
import AddOccupationalHealthCareEntryForm from "./AddOccupationalHealthCareEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { Diagnosis, Patient } from "../../types";
import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnoses"; // Import the diagnosisService
interface Props {
  entryType: string | undefined;
  patient: Patient;
  onClose: () => void;
  codes: string[];
}
const AddEntryForm = (props: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]); // Declare diagnoses as a state variable

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll(); // Declare diagnosisService as a variable
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);
  switch (props.entryType) {
    case "HealthCheckEntry":
      console.log("HealthCheckEntry");
      return (
        <AddHealthcheckEntryForm
          patient={props.patient}
          onClose={() => props.onClose()}
          diagnoses={diagnoses}
        />
      );
    case "HospitalEntry":
      console.log("HospitalEntry");
      return (
        <AddHospitalEntryForm
          patient={props.patient}
          onClose={() => props.onClose()}
          diagnoses={diagnoses}
        />
      );
    case "OccupationalHealthCareEntry":
      console.log("OccupationalHealthCareEntry");
      return (
        <AddOccupationalHealthCareEntryForm
          patient={props.patient}
          onClose={() => props.onClose()}
          diagnoses={diagnoses}
        />
      );
    default:
      return <div></div>;
  }
};
export default AddEntryForm;
