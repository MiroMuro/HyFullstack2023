import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR } from "./queries";
const BirthyearForm = () => {
  const [birthyear, setBirthyear] = useState("");
  const [name, setName] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();
    console.log("update birthyear...");

    updateAuthor({ variables: { name, born: parseInt(birthyear) } });
    setName("");
    setBirthyear("");
  };
  return (
    <div>
      <h1>Update birthyear</h1>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
export default BirthyearForm;
