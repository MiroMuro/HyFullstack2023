import axios from "axios";
import { useState, useEffect } from "react";

const MapsFiltered = ({
  countryInput,
  countriesArray,
  setCountryInput,
  weatherData,
  setWeatherData,
  api_key,
  isLoading,
  setIsLoading,
}) => {
  const filtered = countriesArray.filter((country) =>
    country.name.common.toLowerCase().includes(countryInput)
  );
  const namesFiltered = filtered.map((country) => country.name.common);
  console.log(filtered);
  if (filtered.length > 10) {
    setIsLoading(false);
    return <p>Too many matches, specify another filter</p>;
  } else if (filtered.length === 1) {
    useEffect(() => {
      console.log("Calling api...");
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            filtered[0].capital +
            "&appid=" +
            api_key
        )
        .then((response) => {
          setIsLoading(true);
          setWeatherData(response.data);
          console.log("haloo", weatherData);
          return response.data;
        });
    }, []);

    return isLoading ? (
      <div>
        <h1>{filtered[0].name.common}</h1>
        <p>capital {filtered[0].capital}</p>
        <p>
          area {filtered[0].area}
          <br />
        </p>
        <h2>languages:</h2>
        <ul>
          {Object.values(filtered[0].languages).map((value, index) => {
            return (
              <div key={index}>
                <li>{value}</li>
              </div>
            );
          })}
        </ul>
        <div>
          <img
            style={{ border: "2px solid black" }}
            src={filtered[0].flags.png}
          />
        </div>
        <h2>Weather in {filtered[0].capital}</h2>
        <p>
          temperature {parseFloat(weatherData.main.temp - 273.15).toFixed(2)}{" "}
          celsius
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        ></img>
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    ) : (
      <span>
        Loading... <br />
        Loading... <br />
        Loading... <br />
        Loading... <br />
        Loading... <br />{" "}
      </span>
    );
  } else {
    setIsLoading(false);
    return namesFiltered.map((country) => (
      <div>
        <p>
          {country}
          <button onClick={() => setCountryInput(country.toLowerCase())}>
            show
          </button>
        </p>
      </div>
    ));
  }
};

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [countriesArray, setCountriesArray] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountriesArray(response.data);
        console.log(api_key);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    setCountryInput(event.target.value);
    console.log(countryInput);
  };
  return (
    <>
      <h1>Hello world!</h1>
      <div>
        find countries:
        <input value={countryInput} onChange={handleInputChange}></input>
        <MapsFiltered
          countryInput={countryInput}
          countriesArray={countriesArray}
          setCountryInput={setCountryInput}
          weatherData={weatherData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          api_key={api_key}
          setWeatherData={setWeatherData}
        />
      </div>
    </>
  );
}

export default App;
