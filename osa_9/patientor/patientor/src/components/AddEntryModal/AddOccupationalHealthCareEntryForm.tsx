import React, { useState } from "react";
import { Diagnosis, OccupationalHealthcareEntry, Patient } from "../../types";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import patientService from "../../services/patients";
interface AddOccupationalHealthCareEntryFormProps {
  patient: Patient;
  onClose: () => void;
  diagnoses: Array<Diagnosis>;
  // Define the props for the component here
}

const AddOccupationalHealthCareEntryForm: React.FC<
  AddOccupationalHealthCareEntryFormProps
> = (props: AddOccupationalHealthCareEntryFormProps) => {
  // Define the state variables here
  const [newEntry, setNewEntry] = useState<OccupationalHealthcareEntry>({
    type: "OccupationalHealthcare",
    id: "",
    description: "",
    date: "",
    specialist: "",
    employerName: "",
    diagnosisCodes: [],
    sickLeave: {
      startDate: "",
      endDate: "",
    },
  });

  // Define the event handlers here
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
    console.log("newEntry", newEntry);
  };

  const handleSickLeaveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setNewEntry({
      ...newEntry,
      sickLeave: { ...newEntry.sickLeave, [name]: value },
    });

    console.log("newEntry", newEntry);
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setNewEntry({
      ...newEntry,
      diagnosisCodes: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.patient.entries.push(newEntry);
    const data = await patientService.addEntry(props.patient.id, newEntry);
    console.log("data", data);
    (await data) && props.onClose();
  };
  // Define any helper functions here
  return (
    <div>
      <h1>Health Check</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginLeft: "auto", marginRight: 0 }}>
          <div>
            <FormControl style={{ paddingBottom: "20px", width: "100%" }}>
              <InputLabel>Description</InputLabel>
              <Input
                name="description"
                value={newEntry?.description ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </FormControl>
          </div>
          <div style={{ paddingBottom: "20px", width: "100%" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel shrink>Date</InputLabel>
              <Input
                type="date"
                name="date"
                value={newEntry.date}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </FormControl>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Specialist</InputLabel>
              <Input
                name="specialist"
                value={newEntry.specialist}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </FormControl>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Employer name</InputLabel>
              <Input
                name="employerName"
                value={newEntry.employerName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              />
            </FormControl>
          </div>

          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel shrink>Sickleave start date</InputLabel>
              <Input
                type="date"
                name="startDate"
                value={newEntry.sickLeave?.startDate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleSickLeaveChange(event)
                }
              ></Input>
            </FormControl>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel shrink>Sickleave end date</InputLabel>
              <Input
                type="date"
                name="endDate"
                value={newEntry.sickLeave?.endDate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleSickLeaveChange(event)
                }
              ></Input>
            </FormControl>
          </div>
          <div>
            <FormControl style={{ width: "70%", paddingBottom: "20px" }}>
              <InputLabel>Diagnose codes</InputLabel>

              <Select
                name="diagnosisCodes"
                multiple
                value={newEntry.diagnosisCodes}
                input={<OutlinedInput label="Name" />}
                onChange={handleDiagnosisChange}
              >
                {props.diagnoses.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    {diagnosis.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddOccupationalHealthCareEntryForm;
