import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  console.log("MAA", country);
  console.log(name);
  useEffect(() => {
    const getCountry = async () => {
      const response = await axios.get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
      );
      setCountry({ ...response, found: true });
    };
    getCountry();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log("HELLO");
  if (!country) {
    console.log("NOT FOUND");
    return <div>not found...</div>;
  }

  if (!country.found) {
    console.log("NOT FOUND");
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
