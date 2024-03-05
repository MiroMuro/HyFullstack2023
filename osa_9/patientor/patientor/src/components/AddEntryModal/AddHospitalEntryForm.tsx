import React, { useState } from "react";
import { HospitalEntry } from "../../types";
import { FormControl, InputLabel, Input, Button } from "@mui/material";

interface AddHospitalEntryFormProps {
  // Define the props for the component here
}

const AddHospitalEntryForm: React.FC<AddHospitalEntryFormProps> = () => {
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

  // Define the event handlers here
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };
  // Define any helper functions here
  return (
    <div>
      <h1>Health Check</h1>
      <form>
        <div style={{ marginLeft: "auto", marginRight: 0 }}>
          <div>
            <FormControl style={{ width: "100%" }}>
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
              <InputLabel>Date</InputLabel>
              <Input name="date" />
            </FormControl>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Specialist</InputLabel>
              <Input name="specialist" />
            </FormControl>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Discharge</InputLabel>
              <Input name="date" />
              <Input name="criteria" />
            </FormControl>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>Diagnosis codes</InputLabel>
              <Input name="diagnosisCodes" />
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
