import Diagnosis from "./diagnosis";

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface Discharge {
  date: string;
  criteria: string;
}
interface SickLeave {
  startDate: string;
  endDate: string;
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: healthCheckRating;
  type: "HealthCheck";
}
interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
  type: "OccupationalHealthcare";
}
interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
  type: "Hospital";
}

export enum healthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
