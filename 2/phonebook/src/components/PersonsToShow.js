import React from 'react'
import Person from './Person'
const PersonsToShow = ({persons, filter }) => {
    const personsToShow = persons.filter((person) => person.name.toLowerCase().startsWith(filter.toLowerCase()))

    return(
        <ul>
            {personsToShow.map((person) => <Person person={person} key={person.name}/>)}
        </ul>
    )
}

export default PersonsToShow;