import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  if (action.type === "NEW_NOTE") {
    return state.concat(action.payload);
  }
  return state;
};

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "Flowers must be watered",
    important: "true",
    id: 1,
  },
});
store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "Lunasta arvat",
    important: "false",
    id: 1,
  },
});
store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "Käännä kellot",
    imporant: "false",
    id: 3,
  },
});
const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content}
            <strong>{note.important ? " important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};
renderApp();
store.subscribe(renderApp);
