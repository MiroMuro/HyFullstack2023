import React, { useState } from "react";
import { Diagnosis, HospitalEntry, Patient } from "../../types";
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
interface AddHospitalEntryFormProps {
  // Define the props for the component here
  patient: Patient;
  onClose: () => void;
  diagnoses: Array<Diagnosis>;
}

const AddHospitalEntryForm: React.FC<AddHospitalEntryFormProps> = (
  props: AddHospitalEntryFormProps
) => {
  // Define the state variables here
  const [newEntry, setNewEntry] = useState<HospitalEntry>({
    type: "Hospital",
    id: "",
    description: "",
    date: "",
    specialist: "",
    discharge: {
      date: "",
      criteria: "",
    },
    diagnosisCodes: [],
  });

  // Define the event handlers here
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleDischargeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewEntry({
      ...newEntry,
      discharge: { ...newEntry.discharge, [name]: value },
    });
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
                value={newEntry.description}
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
              <InputLabel shrink>Discharge date </InputLabel>
              <Input
                type="date"
                name="date"
                value={newEntry.discharge.date}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleDischargeChange(event)
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>Discharge criteria</InputLabel>
              <Input
                name="criteria"
                value={newEntry.discharge.criteria}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleDischargeChange(event)
                }
              />
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

export default AddHospitalEntryForm;
