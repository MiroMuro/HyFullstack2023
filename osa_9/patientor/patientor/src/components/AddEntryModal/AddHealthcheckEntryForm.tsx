import React, { useState } from "react";
import { Diagnosis, HealthCheckEntry, Patient } from "../../types";
import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import patientService from "../../services/patients";
import { SelectChangeEvent } from "@mui/material";

interface AddHealthcheckEntryFormProps {
  patient: Patient;
  onClose: () => void;
  diagnoses: Array<Diagnosis>;
}

const AddHealthcheckEntryForm: React.FC<AddHealthcheckEntryFormProps> = (
  props
) => {
  // Define the state variables here
  const [newEntry, setNewEntry] = useState<HealthCheckEntry>({
    type: "HealthCheck",
    healthCheckRating: 0,
    id: "",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  });
  console.log("newEntry", newEntry);
  // Define the event handlers here

  // Define any helper functions here
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
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
    // Call the addEntry method from services/patients.ts here
    props.patient.entries.push(newEntry);
    const data = await patientService.addEntry(props.patient.id, newEntry);
    console.log("data", data);
    (await data) && props.onClose();
  };

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
              <RadioGroup
                aria-labelledby="healthRating"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event)
                }
              >
                <FormControlLabel
                  name="healthCheckRating"
                  value={0}
                  control={<Radio />}
                  label="Healthy"
                />
                <FormControlLabel
                  name="healthCheckRating"
                  value={1}
                  control={<Radio />}
                  label="Low risk"
                />
                <FormControlLabel
                  name="healthCheckRating"
                  value={2}
                  control={<Radio />}
                  label="High Risk"
                />
                <FormControlLabel
                  name="healthCheckRating"
                  value={3}
                  control={<Radio />}
                  label="Critical Risk"
                />
              </RadioGroup>
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

export default AddHealthcheckEntryForm;
