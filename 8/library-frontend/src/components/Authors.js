  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ editBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()

    editBorn({
      variables: { name, born: parseInt(born, 10) }
    })

    setName('')
    setBorn('')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map(a => (
              <option value={a.name} key={a.name}>{a.name}</option>
            ))}
          </select>
          <br />
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          <br />
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
