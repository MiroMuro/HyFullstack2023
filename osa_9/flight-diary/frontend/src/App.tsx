import { useState, useEffect } from "react";
import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  Weather,
  Visibility,
} from "./interfaces";
import { getAllDiaries, postDiary } from "./service/noteservice";
import axios from "axios";
const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  //Id gets added in the backend automatically
  const [newDiaryEntry, setNewDiaryEntry] = useState<DiaryEntry>({
    id: undefined,
    date: "",
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment: "",
  });

  useEffect(() => {
    const getDiaries = async () => {
      const res = await getAllDiaries();
      setEntries(res);
    };
    getDiaries();
  }, []);

  const submitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    //Type narrowing down to DiaryEntry type.
    const res = await postDiary(newDiaryEntry);
    if (axios.isAxiosError(res)) {
      setErrorMessage(res.response?.data);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else if (res === undefined) {
      setErrorMessage("ERROR: undefined");
    } else {
      setEntries([...entries, res]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      [event.target.name]: event.target.value,
    });
    console.log(newDiaryEntry);
  };

  return (
    <div>
      <div>Hello world!</div>
      <div style={{ color: "red" }}>{errorMessage}</div>

      <form onSubmit={submitEntry}>
        <div>
          Date:
          <input
            type="date"
            name="date"
            value={newDiaryEntry.date}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          Weather:
          <span>
            Sunny:
            <input
              defaultChecked
              type="radio"
              name="weather"
              value={Weather.Sunny}
              onChange={(event) => handleChange(event)}
            />
          </span>
          <span>
            Rainy:
            <input
              type="radio"
              name="weather"
              value={Weather.Rainy}
              onChange={(event) => handleChange(event)}
            />
          </span>
          <span>
            Cloudy:
            <input
              type="radio"
              name="weather"
              value={Weather.Cloudy}
              onChange={(event) => handleChange(event)}
            />
          </span>
          <span>
            Stormy
            <input
              type="radio"
              name="weather"
              value={Weather.Stormy}
              onChange={(event) => handleChange(event)}
            />
          </span>
          <span>
            Windy:
            <input
              type="radio"
              name="weather"
              value={Weather.Windy}
              onChange={(event) => handleChange(event)}
            />
          </span>
        </div>
        <span>
          Visibility:
          <span>
            Great
            <input
              type="radio"
              name="visibility"
              value={Visibility.Great}
              onChange={(event) => handleChange(event)}
            />
          </span>
          <span>
            Good
            <input
              defaultChecked
              type="radio"
              name="visibility"
              value={Visibility.Good}
              //onChange={() => handleVisibility(Visibility.Good)}
              onChange={(event) => handleChange(event)}
            />
          </span>
          <span>
            Ok
            <input
              type="radio"
              name="visibility"
              value={Visibility.Ok}
              onChange={(event) => handleChange(event)}
            />
          </span>
          <span>
            Poor
            <input
              type="radio"
              name="visibility"
              value={Visibility.Poor}
              onChange={(event) => handleChange(event)}
            />
          </span>
        </span>
        <div>
          Comment:
          <input
            name="comment"
            value={newDiaryEntry.comment}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
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
