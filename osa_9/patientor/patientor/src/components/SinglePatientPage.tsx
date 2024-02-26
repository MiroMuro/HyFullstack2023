import { Patient, Gender, Diagnosis } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

interface Props {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}
const SinglePatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) {
    return undefined;
  }

  const codes: string[] = [];

  patient.entries.forEach((entry) =>
    entry.diagnosisCodes?.forEach((code) => codes.push(code))
  );

  const patientsDiagnoses: Diagnosis[] = diagnoses.filter((diagnose) => {
    return codes.some((code) => code === diagnose.code);
  });

  return (
    <div>
      {" "}
      <div>
        {patient && (
          <div>
            <h2>
              {patient.name}{" "}
              {patient.gender == Gender.Male ? <MaleIcon /> : null}
              {patient.gender == Gender.Female ? <FemaleIcon /> : null}
              {patient.gender == Gender.Other ? <TransgenderIcon /> : null}
            </h2>
            <div>ssh: {patient.ssn}</div>
            <div>Occupation: {patient.occupation}</div>
            <br />
            <h3>entries</h3>
            <span>
              {patient.entries.map((entry) => (
                <div>
                  <div>{entry.date}</div>
                  <span>
                    <i>{entry.description}</i>
                  </span>
                </div>
              ))}
            </span>
            <ul>
              {patientsDiagnoses.map((diagnose) => (
                <li>
                  {diagnose.code} {diagnose.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>{!patient && <div>Patient not found</div>}</div>
    </div>
  );
};
export default SinglePatientPage;
