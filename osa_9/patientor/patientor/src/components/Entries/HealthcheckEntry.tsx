import { HealthCheckEntry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { green, red, yellow } from "@mui/material/colors";
const HealthcheckEntryComponent = (props: { entry: HealthCheckEntry }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>
        {props.entry.date} <MedicalServicesIcon />
      </h3>
      <p>{props.entry.description}</p>
      <p>
        {props.entry.healthCheckRating == 0 ? (
          <FavoriteIcon sx={{ color: green[800] }} />
        ) : null}
        {props.entry.healthCheckRating == 1 ? (
          <FavoriteIcon sx={{ color: yellow[800] }} />
        ) : null}
        {props.entry.healthCheckRating == 2 ? (
          <FavoriteIcon sx={{ color: red[800] }} />
        ) : null}
        {props.entry.healthCheckRating == 3 ? (
          <FavoriteIcon sx={{ color: "black" }} />
        ) : null}
      </p>
      <div>Diagnosed by: {props.entry.specialist}</div>
    </div>
  );
};

export default HealthcheckEntryComponent;
