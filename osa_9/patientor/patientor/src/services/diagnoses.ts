import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const res = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return res.data;
};

export default { getAll };
