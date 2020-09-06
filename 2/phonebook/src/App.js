/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsToShow from './components/PersonsToShow'
import conn from './services/conn'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [msg, setMsg] = useState(null)
  const [color, setColor] = useState('green')
  useEffect(() => {
    conn.getAll().then((res) => setPersons(res)).catch(err => console.log(err))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const check = persons.filter((person) => person.name === newName)
    if(check.length > 0){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        conn.update(check[0].id, { ...check[0], number: newNumber })
        .then(res => {
          setPersons(persons.map(person => person.name !== check[0].name ? person : res))
          setMsg(`The number of ${newName} is changed`)
          setColor('green')
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
        .catch(err => {
          console.log(err)
          setMsg(`information of ${newName} has already been removed from server`)
          setColor('red')
          setTimeout(() => {
            setMsg(null)
          }, 5000)
          setPersons(persons.filter(person => person.name !== newName))
        })
      }    
    } else {
      conn.create({ name: newName, number: newNumber }).then(res => setPersons(persons.concat(res))).catch(err => console.log(err))
      setMsg(`Added ${newName}`)
      setColor('green')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
    setNewNumber('')
    setNewName('')
  }

  const handleDelete = (id) => {
    conn.handleDelete(id).then(res => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(err=> console.log(err))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} color={color}/>
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
      <PersonsToShow persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App