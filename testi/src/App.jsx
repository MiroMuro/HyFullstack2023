import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from "./services/notes"

const App = (props) => {  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("dust to dust")
  const [showAll, setShowAll] = useState(false)

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
        alert(
          `the note ${note.content} was already deleted from the server!`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App 