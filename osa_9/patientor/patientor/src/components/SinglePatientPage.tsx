import { Patient, Gender } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
interface Props {
  patient: Patient;
}
const SinglePatientPage = ({ patient }: Props) => {
  const genderValue = (gender: Gender) => {
    if (patient.gender === Gender.Female) {
      return <FemaleIcon />;
    } else if (patient.gender === Gender.Male) {
      return <MaleIcon />;
    } else if (patient.gender === Gender.Other) {
      return <TransgenderIcon />;
    }
  };

  return (
    <div>
      {" "}
      <div>
        {patient && (
          <div>
            <h2>
              {patient.name} {genderValue(patient.gender)}
            </h2>
            <div>ssh: {patient.ssn}</div>
            <div>Occupation: {patient.occupation}</div>
          </div>
        )}
      </div>
      <div>{!patient && <div>Patient not found</div>}</div>
    </div>
  );
};
export default SinglePatientPage;
