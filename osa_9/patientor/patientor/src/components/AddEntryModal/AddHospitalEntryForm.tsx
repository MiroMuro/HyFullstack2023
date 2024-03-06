import React, { useState } from "react";
import { HospitalEntry, Patient } from "../../types";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import patientService from "../../services/patients";
interface AddHospitalEntryFormProps {
  // Define the props for the component here
  patient: Patient;
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
  });
  console.log("props", props);
  // Define the event handlers here
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
    console.log("newEntry", newEntry);
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

  const handleDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const updatedDiagnosisCodes = value.split(",").map((code) => code.trim());
    setNewEntry({
      ...newEntry,
      diagnosisCodes: updatedDiagnosisCodes,
    });
    console.log("newEntry", newEntry);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.patient.entries.push(newEntry);
    const data = await patientService.addEntry(props.patient.id, newEntry);
    console.log("data", data);
  };
  // Define any helper functions here
  return (
    <div>
      <h1>Health Check</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginLeft: "auto", marginRight: 0 }}>
          <div>
            <FormControl style={{ width: "100%" }}>
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
              <InputLabel>Date</InputLabel>
              <Input
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
              <InputLabel>Discharge date </InputLabel>
              <Input
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
          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Diagnosis codes</InputLabel>
              <Input
                name="diagnosisCodes"
                value={newEntry.diagnosisCodes?.join(",") ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleDiagnosisChange(event)
                }
              />
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
