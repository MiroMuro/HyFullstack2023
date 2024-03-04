import { HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryComponent = (props: { entry: HospitalEntry }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        margin: "10px",
      }}
    >
      <h3>
        {props.entry.date} <LocalHospitalIcon />
      </h3>
      <p>{props.entry.description}</p>
      <div>Diagnose by: {props.entry.specialist}</div>
      <div>
        Discharged: {props.entry.discharge.date}{" "}
        {props.entry.discharge.criteria}
      </div>
    </div>
  );
};
export default HospitalEntryComponent;
