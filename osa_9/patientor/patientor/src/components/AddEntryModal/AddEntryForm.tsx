interface Props {
  entryType: string | undefined;
  id: string;
}
import AddHealthcheckEntryForm from "./AddHealthcheckEntryForm";
import AddOccupationalHealthCareEntryForm from "./AddOccupationalHealthCareEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
const AddEntryForm = (props: Props) => {
  switch (props.entryType) {
    case "HealthCheckEntry":
      console.log("HealthCheckEntry");
      return <AddHealthcheckEntryForm id={props.id} />;
    case "HospitalEntry":
      console.log("HospitalEntry");
      return <AddHospitalEntryForm id={props.id} />;
    case "OccupationalHealthCareEntry":
      console.log("OccupationalHealthCareEntry");
      return <AddOccupationalHealthCareEntryForm id={props.id} />;
    default:
      return <div></div>;
  }
};
export default AddEntryForm;
