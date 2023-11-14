import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from "./services/notes"

const Footer = () =>{
  const footerStyle = {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 24
  }

  return(
    <div style={footerStyle}>
      <br/>
      <em>Note app, Department of Computer Science, University of Helsinki</em>
    </div>
  )
}

const Notification = ({message}) => {
  if(message === null){
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = (props) => {  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("dust to dust")
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    noteService
    .getAll()
    .then(initialNotes =>{
      setNotes(initialNotes)
    })
  }, [])
  console.log('render',notes.length, 'notes')

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const addNote = (event) =>{
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1
    }
    noteService
      .create(noteObject)
      .then(initialNotes => {
        setNotes(notes.concat(initialNotes))
        setNewNote("")
      })
    
  }
  const handleInputChange = (event) =>{
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) =>{
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    noteService
      .update(id, changedNote)
      .then(returnedNote =>{
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error =>{
        setErrorMessage(
          `Note '${note.content}' was already removed from the server!`
        )
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <ul>
        {notesToShow.map(note => 
          <Note 
           key={note.id}
           note={note} 
           toggleImportance={()=>toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form
      onSubmit={addNote}>
        <input value={newNote}
        onChange={handleInputChange}/>
        <button type="submit">save</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show { showAll ? 'important' : 'all'}</button>
      </div>
      <Footer/>
    </div>
  )
}

export default App 