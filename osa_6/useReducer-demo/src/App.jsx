import Button from "./components/Button";
import Display from "./components/Display";
const App = () => {
  return (
    <div>
      <Display />
      <Button type="plus" label="+" />
      <Button type="minus" label="-" />
      <Button type="reset" label="0" />
    </div>
  );
};

export default App;
