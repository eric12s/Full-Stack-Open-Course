import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsToShow from './components/PersonsToShow'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    persons.filter((person) => person.name === newName).length > 0 
    ? alert(`${newName} is already added to phonebook`) 
    : setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a note</h3>
      <Form 
        handleSubmit={handleSubmit} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <PersonsToShow persons={persons} filter={filter} />
    </div>
  )
}

export default App