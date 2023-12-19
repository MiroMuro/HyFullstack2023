const NoteForm = ({ onSubmit, handleChange, value, blog }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Author:
          <input
            name="author"
            value={value.author}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Title:
          <input
            name="title"
            value={value.title}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Url:
          <input name="url" value={value.url} onChange={handleChange}></input>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};
export default NoteForm;
