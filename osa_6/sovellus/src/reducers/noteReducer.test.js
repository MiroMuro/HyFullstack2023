import noteReducer from "./noteReducer";
import deepFreeze from "deep-freeze";

describe("noteReducer", () => {
  test("return a new state with action NEW_NOTE", () => {
    const state = [];
    const action = {
      type: "notes/createNote",
      payload: "The app state in redux store",
    };
    deepFreeze(state);
    const newState = noteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });

  test("Returns a new state with action TOGGLE_IMPORTANCE", () => {
    const state = [
      {
        content: "Flowers must be watered",
        important: true,
        id: 1,
      },
      {
        content: "Lunasta arvat",
        important: false,
        id: 2,
      },
    ];

    const action = {
      type: "notes/toggleImportanceOf",
      payload: 2,
    };

    deepFreeze(state);
    const newState = noteReducer(state, action);
    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[0]);

    expect(newState).toContainEqual({
      content: "Lunasta arvat",
      important: true,
      id: 2,
    });
  });
});
