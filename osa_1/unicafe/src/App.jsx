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
    return ( 
    <tr>
      <td> Good: </td>
      <td>{good}</td>  
    </tr>)
  }
  else if(text === "bad" && määrä !== 0){
    return( 
      <tr>
      <td> Bad: </td>
      <td>{bad}</td>  
    </tr>)
    
  }
  else if(text === "neutral" && määrä !== 0){
    return (
      <tr>
      <td> Neutral: </td>
      <td>{neutral}</td>  
    </tr>)
    
  }
  else if(text === "average" && määrä !== 0){
    return(
      <tr>
      <td>Average</td>
      <td>{(good+ neutral*0 + (-bad))/määrä}</td>
      </tr>
    )
  }
  else if(text === "positive" && määrä !== 0){
    return(
      <tr>
    <td>Positive: </td>
    <td>{(good / määrä)*100}%</td>
    </tr>
    )
  } 
  else if(text === undefined) {
    return( 
    <tr>
    <td>All: </td>
    <td>{määrä}</td>
    </tr>)
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
      <table>
      <StatisticLine text="good" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="neutral" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="bad" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="average" good={good} bad={bad} neutral={neutral} />
      <StatisticLine text="positive" good={good} bad={bad} neutral={neutral} />
      <StatisticLine  good={good} bad={bad} neutral={neutral} />
      </table>
      

    </>
  )
}


  
export default App
