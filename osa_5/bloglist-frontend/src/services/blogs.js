import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("MOI  ", token);
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("HERE", updatedBlog);
  const res = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
};
export default { getAll, setToken, postBlog, updateBlog };
