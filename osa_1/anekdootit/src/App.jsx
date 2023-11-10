import { useState } from 'react'
const Button = ({handleClick,text}) => {
  return(
  <button onClick={handleClick}>{text}</button>)
} 

const Anecdote = ({index, anecdotes, text}) =>{
  let mostVotes = Math.max(...anecdotes.map(o => o.votes))
  let obj = anecdotes.find(o => o.votes === mostVotes)
  console.log(obj)
  if(text==="max"){
    return(
      <>
      <h1>Anecdote with most votes</h1>
      <p>{obj.text} <br/> Has {obj.votes} votes</p>
      </>
    )
  } else{
return(
  <>
 <p>{anecdotes[index].text}</p>
 <p>Votes: {anecdotes[index].votes}</p>
 </>
)
}}



const App = () => {
  const [newIndex, setNewIndex] = useState(0)
  
  const [anecdotes, setAnecdotes] = useState([
    {text:'If it hurts, do it more often.', votes: 0},
    {text:'Adding manpower to a late software project makes it later!',votes: 0},
    {text:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',votes: 0},
    {text:'Premature optimization is the root of all evil.',votes: 0 },
    {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',votes: 0},
    {text: 'The only way to go fast, is to go well.', votes: 0}
  ])
   
  const handleVoteClick = (index) =>{
    const copy = [...anecdotes]
    copy[index].votes = copy[index].votes +1
    setAnecdotes(copy)
  }

  const getRandomInt = (max) =>{
    return(Math.floor(Math.random()* max))
  }

  return (
    <div>
      <Button handleClick={() => setNewIndex(getRandomInt(8))} text="next anecdote"/>
      <Button handleClick={() => handleVoteClick(newIndex)} text="vote"/>
      <Anecdote index={newIndex} anecdotes={anecdotes}/>
      <Anecdote index={newIndex} anecdotes={anecdotes} text="max"/>
    </div>
    
  )
}

export default App