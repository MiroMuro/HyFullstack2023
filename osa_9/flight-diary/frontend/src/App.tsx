import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./interfaces";
import { getAllDiaries } from "./service/noteservice";
const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const getDiaries = async () => {
      const res = await getAllDiaries();
      setEntries(res);
    };
    getDiaries();
  }, []);
  return (
    <div>
      <div>Hello world!</div>
      <ul>
        {entries.map((entry) => (
          <li id={String(entry.id)}>
            <p>Date:{entry.date}</p>
            <p>Weather:{entry.weather}</p>
            <p>Visibility: {entry.visibility}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
