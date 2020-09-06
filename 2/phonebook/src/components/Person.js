import React from 'react'

const Person = ({ person, handleDelete }) => {

  const handleDeleteAndConfirm = (id) => {
    if(window.confirm(`Delete ${person.name}`))
      handleDelete(person.id)
  }

    return(<li>
      {person.name + " " + person.number} <button onClick={() => handleDeleteAndConfirm(person.id)}>delete</button>
      </li>
    )
  }

  export default Person;
  