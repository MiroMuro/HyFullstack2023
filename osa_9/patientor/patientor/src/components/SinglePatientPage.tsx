import { Patient, Gender, Diagnosis, Entry } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HealthcheckEntryComponent from "./Entries/HealthcheckEntry";
import HospitalEntryComponent from "./Entries/HospitalEntry";
import OccupationalEntryComponent from "./Entries/OccupationalEntry";
import { Button } from "@mui/material";
import { useState } from "react";
import AddEntryModal from "./AddEntryModal";
interface Props {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}
const SinglePatientPage = ({ patient, diagnoses }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClose = (): void => {
    setModalOpen(false);
  };

  if (!patient) {
    return undefined;
  }

  const EntryDetails = (entry: Entry) => {
    console.log("entry", entry);
    console.log("entry type", entry.type);

    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryComponent entry={entry} />;
      case "HealthCheck":
        return <HealthcheckEntryComponent entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalEntryComponent entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  function assertNever(entry: never): never {
    throw new Error(
      `Unhandled discriminated union member ${JSON.stringify(entry)}`
    );
  }
  //Diagnosiscodes from the patients entries

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

            <ul style={{ padding: 0 }}>
              {patientsDiagnoses.map((diagnose) => (
                <li>
                  {diagnose.code} {diagnose.name}
                </li>
              ))}
            </ul>
            <ul style={{ padding: 0 }}>
              {patient.entries.map((entry) => (
                <div>{EntryDetails(entry)!}</div>
              ))}
            </ul>
            <AddEntryModal
              modalOpen={modalOpen}
              onClose={onClose}
              id={patient.id}
              patient={patient}
            />
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              Add a new entry
            </Button>
          </div>
        )}
      </div>
      <div>{!patient && <div>Patient not found</div>}</div>
    </div>
  );
};
export default SinglePatientPage;
