import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const newId: string = uuidv4() as string;

import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const newPatient = { ...object, id: newId, entries: [] };
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    newPatient
  );

  return data;
};

const addEntry = async (id: string, object: Entry) => {
  const newEntry: Entry = { ...object, id: newId };
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    newEntry
  );

  return data;
};

export default {
  getAll,
  create,
  addEntry,
};
