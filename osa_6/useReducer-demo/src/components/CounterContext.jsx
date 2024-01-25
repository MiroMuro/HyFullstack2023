import { createContext, useReducer, useContext } from "react";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "plus":
      return state + 1;
    case "minus":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[0];
};

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext);
  return counterAndDispatch[1];
};
const CounterContext = createContext();

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContext;
