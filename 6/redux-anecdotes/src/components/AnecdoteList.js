import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (id, content) => {
    props.addVote(id)
    props.setNotification(`You voted '${content}'`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase())),
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  addVote, setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)