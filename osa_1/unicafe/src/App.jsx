import {useState} from 'react'
  
const Button = ({text, handleClick}) => <button onClick={handleClick}> {text}</button>

const StatisticLine =({good, bad, neutral, text}) =>{
  let määrä = good + bad + neutral
  
  if(määrä === 0 && text == undefined){
    return(
      <p>No feedback given</p>
    )
  }
  else if(text === "good" && määrä !== 0){
    return ( <p> Good: {good}</p>)
  }
  else if(text === "bad" && määrä !== 0){
    return( <p> Bad: {bad}</p>)
  }
  else if(text === "neutral" && määrä !== 0){
    return (<p> Neutral: {neutral}</p>)
  }
  else if(text === "average" && määrä !== 0){
    return(<p>Average {(good+ neutral*0 + (-bad))/määrä}</p>)
  }
  else if(text === "positive" && määrä !== 0){
    return(
    <p>Positive {(good / määrä)*100}%</p>
    )
  } 
  else if(text === undefined) {
    return( <p>All {määrä}</p>)
  }
  
    
  
}

const App = () => {

const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const [total, setTotal] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />      
      <Button handleClick={() => setNeutral(good +1)} text="neutral" />      
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>Statistics</h1>
      <StatisticLine good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="good" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="neutral" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="bad" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="average" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="positive" good={good} bad={bad} neutral={neutral} />

    </>
  )
}


  
export default App
