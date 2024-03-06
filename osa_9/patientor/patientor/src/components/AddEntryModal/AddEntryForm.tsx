import AddHealthcheckEntryForm from "./AddHealthcheckEntryForm";
import AddOccupationalHealthCareEntryForm from "./AddOccupationalHealthCareEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { Patient } from "../../types";
interface Props {
  entryType: string | undefined;
  id: string;
  patient: Patient;
}
const AddEntryForm = (props: Props) => {
  switch (props.entryType) {
    case "HealthCheckEntry":
      console.log("HealthCheckEntry");
      return <AddHealthcheckEntryForm patient={props.patient} />;
    case "HospitalEntry":
      console.log("HospitalEntry");
      return <AddHospitalEntryForm patient={props.patient} />;
    case "OccupationalHealthCareEntry":
      console.log("OccupationalHealthCareEntry");
      return <AddOccupationalHealthCareEntryForm patient={props.patient} />;
    default:
      return <div></div>;
  }
};
export default AddEntryForm;
