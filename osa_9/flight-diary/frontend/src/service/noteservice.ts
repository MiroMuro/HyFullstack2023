import axios from "axios";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../interfaces";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const res = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return res.data;
};

export const postDiary = async (entry: DiaryEntry) => {
  try {
    const res = await axios.post<DiaryEntry>(baseUrl, entry);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error;
    }
  }
};
