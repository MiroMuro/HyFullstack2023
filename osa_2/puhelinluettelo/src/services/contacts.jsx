import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const createContact = newObject =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const getAllContacts =()=> {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const deleteContact = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response =>response.data)
}
const updateContact = (id, contact)=>{
    const request = axios.put(`${baseUrl}/${id}`, contact)
    return request.then(response => response.data)
}

export default {createContact, getAllContacts, deleteContact, updateContact}