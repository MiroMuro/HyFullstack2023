import { OccupationalHealthcareEntry } from "../../types";

const OccuPationalEntryComponent = (props: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>
        {props.entry.date}, {props.entry.employerName}
      </h3>
      <p>
        <i>{props.entry.description}</i>
      </p>
      <p>Diagnose by {props.entry.specialist}</p>

      <div>
        {props.entry.sickLeave && (
          <div>
            Sick leave {props.entry.sickLeave.startDate} -{" "}
            {props.entry.sickLeave.endDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default OccuPationalEntryComponent;
