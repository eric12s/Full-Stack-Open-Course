import React, { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsToShow from './components/PersonsToShow'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter ] = useState('')

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