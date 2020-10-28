import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  console.log(anecdote)
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: 0
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(an => an.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !==  id ? anecdote : changedAnecdote
      )
    }
    case 'ADD': {
      const anecdote = (action.data)
      console.log(anecdote)
      return state.concat(asObject(anecdote))
    }
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const addVote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default reducer