const filterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER": {
      console.log("HERRE", state);
      return action.payload;
    }
    default:
      return null;
  }
};

export const handleFilterChange = (input) => {
  return {
    type: "FILTER",
    payload: input,
  };
};
export default filterReducer;
