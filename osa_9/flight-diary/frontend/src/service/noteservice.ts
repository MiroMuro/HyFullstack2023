import axios from "axios";
import { NonSensitiveDiaryEntry } from "../interfaces";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const res = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return res.data;
};
