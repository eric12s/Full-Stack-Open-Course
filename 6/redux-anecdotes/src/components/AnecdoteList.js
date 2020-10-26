import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  const compareAnecdotes = (a, b) => a.props.children[1].props.children[1] - b.props.children[1].props.children[1]

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>).sort(compareAnecdotes)}
    </div>
  )
}

export default AnecdoteList