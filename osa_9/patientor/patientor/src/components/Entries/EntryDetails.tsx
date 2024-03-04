import { Patient, Gender, Diagnosis, Entry } from "../../types";
import HealthcheckEntry from "./HospitalEntry";
import HospitalEntry from "./HealthcheckEntry";
import OccupationalEntry from "./OccupationalEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const HospitalEntry = (props: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return entry;
      case "HealthCheck":
        return entry;
      case "OccupationalHealthcare":
        return entry;
      default:
        return assertNever(entry);
    }
  };
};
export default EntryDetails;
