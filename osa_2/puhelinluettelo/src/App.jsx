import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneBookService from "./services/contacts"

const Notification = ({message}) =>{
  if(message === null){
    return null
  }else if(message.includes(" was already removed from the server!")){
    const errorStyle = {
      color:'red',
      backgroundColor: 'rgb(196, 192, 192)',
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
  }
    return(
      <div style={errorStyle}>
      {message}
    </div>
    )
  }
  return(
    <div className="notification">
      {message}
    </div>
  )
}

const Filter = ({searchWord, onChange}) =>{
  return(
    <div>Search for a contact
      <input
        value={searchWord}
        onChange={onChange}>
      </input>
    </div>
  )
}

const PersonForm = (props) =>{
  let name = props.contact.name
  let number = props.contact.number

  return(
    <form onSubmit={props.addContact} >
      <div>Name: <input
      value={name} 
      onChange={props.handleInputChange}/>
      </div>
      <div>Number: <input
      value={number} 
      onChange={props.handleNumberChange}/>
      </div>
      <button type="submit"> add</button>
    </form>
  )
}

const Contacts=({phoneBook,searchWord,onClick}) =>{
    const filterd = phoneBook.filter(contact => contact.name.toLowerCase().includes(searchWord))
    return(
      filterd.map(((contact) => 
      <div key={contact.id}>
      <li >{contact.name} {contact.number} <button type='button' onClick={()=>onClick(contact.id)}>Delete</button></li>
      </div>
      ))
    )
  }

const App = () => {
  const [phoneBook, setPhonebook] = useState([])
  const [contact, setContact] = useState({
    name : "", number : ""
  })
  const [searchWord, setSearchWord] = useState("")
  const [message,setMessage] = useState(null)

  const hook = () =>{
    phoneBookService
    .getAllContacts()
    .then(initialContacts => {
      setPhonebook(initialContacts)
    })
  }
  useEffect(hook,[])

  const addContact = (event) =>{
    event.preventDefault()
    
        if(phoneBook.some(x => x.name === contact.name)){
          if(confirm("Do you want to alter this persons phone number")===true){
            let contactToUpdate = phoneBook.filter(y => y.name === contact.name)[0]
            console.log(contactToUpdate)
             phoneBookService
             .updateContact(contactToUpdate.id, contact)
             .then(updatedContact =>{
              handleMessageChange(updatedContact," phone number updated")
              setPhonebook(phoneBook.map(contact => contact.id !== updatedContact.id ? contact : updatedContact))
             })
             .catch(error=>{
              handleMessageChange(contactToUpdate," was already removed from the server!")
             })
          }else{
           null 
          }
          } else {
        const newContactObject = {
          name: contact.name,
          number: contact.number
        }
        phoneBookService
        .createContact(newContactObject)
        .then(initialContacts => {
          console.log("Lisäys", initialContacts)
          handleMessageChange(initialContacts," was added to the phonebook")
          setPhonebook(phoneBook.concat(initialContacts))
        })
      }
  }

  const dc = (id) =>{
    const personToBeDeleted = phoneBook.find((contact) => contact.id === id)
    console.log(personToBeDeleted.name)
    if(window.confirm(`Do you really want to delete ${personToBeDeleted.name}?`)){
      phoneBookService
    .deleteContact(id)
    .then(response =>{
      console.log(personToBeDeleted)
      handleMessageChange(personToBeDeleted,
         "was deleted from the phonebook")
    })
    setPhonebook(phoneBook.filter(contact => contact.id !== id))
  }
    }
    

  const handleMessageChange = (x,y,z) =>{
    
    setMessage(`${x.name} ${y}`)
      setTimeout(()=>{
        setMessage(null)
      },3000)
  }
  

  const handleInputChange = (event) =>{
    const newContact = {
      name: event.target.value,
      number : contact.number
    }
    setContact(newContact)

    
  }
  const handleNumberChange = (event) =>{
    const newContact = {
      name: contact.name,
      number : event.target.value
    }
    setContact(newContact)
  }
  const handleSearchWordChange = (event) =>{
    setSearchWord(event.target.value)
  }
  
  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Filter searchWord={searchWord}
        onChange={handleSearchWordChange}/>
      <h1>Add a new Contact</h1>
      <PersonForm 
      handleInputChange={handleInputChange}
      handleNumberChange={handleNumberChange}
      addContact={addContact}
      contact={contact}
      />
      <h1>Numbers:</h1>
      <div>
      <ul>
        <Contacts phoneBook={phoneBook} searchWord={searchWord} onClick={dc}/>
      </ul>
      </div>
    </>
  )
}

export default App
