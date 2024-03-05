import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Button, IconButton } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { red } from "@mui/material/colors";
import { Entry } from "../../types";
interface Props {
  id: string;
  modalOpen: boolean;
  onClose: () => void;
}
const AddEntryModal = (props: Props) => {
  const [entryType, setEntryType] = useState<string>();
  return (
    <Dialog
      fullWidth={true}
      open={props.modalOpen}
      onClose={() => props.onClose()}
    >
      <DialogTitle>
        New health check entry{" "}
        <IconButton onClick={() => props.onClose()} sx={{ color: red[500] }}>
          <CancelIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <span>
          <Button
            variant="outlined"
            onClick={() => setEntryType("HealthCheckEntry")}
          >
            Health Check
          </Button>
          <Button
            variant="outlined"
            onClick={() => setEntryType("HospitalEntry")}
          >
            Hospital
          </Button>
          <Button
            variant="outlined"
            onClick={() => setEntryType("OccupationalHealthCareEntry")}
          >
            Occupational Healthcare
          </Button>
        </span>
        <AddEntryForm id={props.id} entryType={entryType} />
      </DialogContent>
    </Dialog>
  );
};
export default AddEntryModal;
