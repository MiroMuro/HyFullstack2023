import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import React from "react";
const App = () => {
  return (
    <div>
      <NewNote />
      <ul>
        <Notes />
      </ul>
    </div>
  );
};

export default App;
