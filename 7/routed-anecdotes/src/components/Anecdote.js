import React from 'react'

const Anecdote = ({ anecdote }) => (
    <div>
      <h2>{`${anecdote.content} by ${anecdote.auther}`}</h2>
      {`has ${anecdote.votes} votes`}
      <br /><br />
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )

export default Anecdote
