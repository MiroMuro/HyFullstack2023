import { Gender, Patient, Entry } from "./interfaces/patient";
import Diagnosis from "./interfaces/diagnosis";
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  const regex =
    /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])([0-9]{2})-([0-9]{2,3})([0-9A-Z])$/;
  return regex.test(ssn);
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

export const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }
  if (
    "description" in entry &&
    "date" in entry &&
    "specialist" in entry &&
    "type" in entry
  ) {
    switch (entry.type) {
      case "HealthCheck":
        const x = "healthCheckRating" in entry ? true : false;
        return x;
      case "OccupationalHealthcare":
        const y = "employerName" in entry ? true : false;
        return y;
      case "Hospital":
        const z = "discharge" in entry ? true : false;
        return z;
      default:
        return false;
    }
  } else {
    return false;
  }
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error("Incorrect or missing SSN: " + ssn);
  }
  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name!");
  }
  return name;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender! (gender is case sensitive) ");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};
const parseEntries = (entries: unknown): Entry[] => {
  if (Array.isArray(entries)) {
    entries.forEach((entry) => {
      if (!isEntry(entry)) {
        throw new Error("AAIDDSS WRONG ENTRY");
      }
    });
    return entries as Entry[];
  }
  throw new Error("Entries was not an array.");
};

const parseId = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error("Incorrect or missing id" + id);
  }
  return id;
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    //trust the data this time.
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const toNewPatient = (object: unknown): Patient => {
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing data");
  }

  if (
    "id" in object &&
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: Patient = {
      id: parseId(object.id),
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }
  throw new Error("Incorrect data, missing fields in patient");
};

export default toNewPatient;
