import { useState, useEffect } from "react";
import phoneBookService from "./services/contacts";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};

const Filter = ({ searchWord, onChange }) => {
  return (
    <div className="search">
      <br />
      <h1>Search for a contact</h1>
      <p className="searchText">Name</p>
      <input
        className="searchInput"
        placeholder="Contact name..."
        value={searchWord}
        onChange={onChange}
      ></input>
    </div>
  );
};

const PersonForm = (props) => {
  let name = props.contact.name;
  let number = props.contact.number;

  return (
    <div className="form">
      <form onSubmit={props.addContact}>
        <div className="formDiv">
          <p className="inputTitle">Name</p>
          <input
            className="contactInput"
            placeholder="Contact name.."
            value={name}
            onChange={props.handleInputChange}
          />
        </div>
        <div className="formDiv">
          <p className="inputTitle">Number</p>
          <input
            className="contactInput"
            placeholder="Contact number..."
            value={number}
            onChange={props.handleNumberChange}
          />
        </div>
        <button type="submit" className="addButton">
          {" "}
          Add contact
        </button>
      </form>
    </div>
  );
};

const Contacts = ({ phoneBook, searchWord, onClick }) => {
  const filterd = phoneBook.filter((contact) =>
    contact.name.toLowerCase().includes(searchWord)
  );
  return filterd.map((contact) => (
    <div className="contactDiv" key={contact.id}>
      <li className="contactInstance">
        {contact.name} {contact.number}{" "}
        <button
          type="button"
          className="deleteButton"
          onClick={() => onClick(contact.id)}
        >
          Delete
        </button>
      </li>
    </div>
  ));
};

const App = () => {
  const [phoneBook, setPhonebook] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    number: "",
  });
  const [searchWord, setSearchWord] = useState("");
  const [message, setMessage] = useState(null);

  const hook = () => {
    phoneBookService.getAllContacts().then((initialContacts) => {
      setPhonebook(initialContacts);
    });
  };
  useEffect(hook, []);

  const addContact = (event) => {
    event.preventDefault();
    if (phoneBook.some((x) => x.name === contact.name)) {
      if (confirm("Do you want to alter this persons phone number") === true) {
        let contactToUpdate = phoneBook.filter(
          (y) => y.name === contact.name
        )[0];
        console.log(contactToUpdate);
        phoneBookService
          .updateContact(contactToUpdate.id, contact)
          .then((updatedContact) => {
            handleMessageChange(`${updatedContact.name} phone number updated`);
            setPhonebook(
              phoneBook.map((contact) =>
                contact.id !== updatedContact.id ? contact : updatedContact
              )
            );
          })
          .catch((error) => {
            handleMessageChange(`${error.response.data.error}`);
            console.log(error.response.data);
          });
      } else {
        null;
      }
    } else {
      const newContactObject = {
        name: contact.name,
        number: contact.number,
      };
      phoneBookService
        .createContact(newContactObject)
        .then((initialContacts) => {
          console.log("Lisäys", initialContacts);
          handleMessageChange(
            `${initialContacts.name} was added to the phonebook`
          );
          setPhonebook(phoneBook.concat(initialContacts));
        })
        .catch((error) => {
          handleMessageChange(`${error.response.data.error}`);
          console.log(error.response.data);
        });
      setContact({ name: "", number: "" });
    }
  };

  const dc = (id) => {
    const personToBeDeleted = phoneBook.find((contact) => contact.id === id);
    if (
      window.confirm(`Do you really want to delete ${personToBeDeleted.name}?`)
    ) {
      phoneBookService.deleteContact(id).then((response) => {
        handleMessageChange(
          `${personToBeDeleted.name} was deleted from the phonebook`
        );
      });
      setPhonebook(phoneBook.filter((contact) => contact.id !== id));
    }
  };

  const handleMessageChange = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleInputChange = (event) => {
    const newContact = {
      name: event.target.value,
      number: contact.number,
    };
    setContact(newContact);
  };
  const handleNumberChange = (event) => {
    const newContact = {
      name: contact.name,
      number: event.target.value,
    };
    setContact(newContact);
  };
  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value);
  };

  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <Notification message={message} />
      <Filter searchWord={searchWord} onChange={handleSearchWordChange} />
      <h1>Add a new Contact</h1>
      <PersonForm
        handleInputChange={handleInputChange}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
        contact={contact}
      />
      <h1>Numbers:</h1>
      <div>
        <ul className="contactUl">
          <Contacts
            phoneBook={phoneBook}
            searchWord={searchWord}
            onClick={dc}
          />
        </ul>
      </div>
    </div>
  );
};

export default App;
