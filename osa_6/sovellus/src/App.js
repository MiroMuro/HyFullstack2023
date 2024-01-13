import { useEffect } from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import React from "react";
import VisibilityFilter from "./components/VisibilityFilter";
//import noteService from "./services/notes";
import { initializeNotes /*, setNotes*/ } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, []);
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <ul>
        <Notes />
      </ul>
    </div>
  );
};

export default App;
