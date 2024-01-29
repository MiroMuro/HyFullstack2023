import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  console.log(newToken);
  token = `bearer ${newToken}`;
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const postBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("MOI  ", token);
  const res = axios.post(baseUrl, newBlog, config).then((res) => res.data);
  return res;
};

export const updateBlog = (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("HERE", updatedBlog);
  const res = axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    .then((res) => res.data);
  return res;
};

export const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("Delete", config);
  console.log("Delete", blogToDelete);
  await axios.delete(`${baseUrl}/${blogToDelete}`, config);
};
export default { getAll, setToken, postBlog, updateBlog, deleteBlog };
