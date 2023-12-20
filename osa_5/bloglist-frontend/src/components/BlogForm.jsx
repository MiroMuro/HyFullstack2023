import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addingBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });
    setNewBlog("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((prevState) => ({ ...prevState, [name]: value }));
    console.log(newBlog);
  };

  return (
    <div>
      <form onSubmit={addingBlog}>
        <div>
          Author:
          <input
            name="author"
            value={newBlog.author}
            onChange={(event) => handleInputChange(event)}
          ></input>
        </div>
        <div>
          Title:
          <input
            name="title"
            value={newBlog.title}
            onChange={(event) => handleInputChange(event)}
          ></input>
        </div>
        <div>
          Url:
          <input
            name="url"
            value={newBlog.url}
            onChange={(event) => handleInputChange(event)}
          ></input>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};
export default BlogForm;
