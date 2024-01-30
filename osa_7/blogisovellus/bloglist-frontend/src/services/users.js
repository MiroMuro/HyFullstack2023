import axios from "axios";
const baseurl = "/api/users";

export const getAllUsers = async () => {
  const res = await axios.get(baseurl);
  return res.data;
};
