import React, { useState } from 'react'
import { addCommentAct } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setcomment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    console.log('handle submit')
    dispatch(addCommentAct(blog, comment))
  }

  return(
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input value={comment} onChange={(e) => setcomment(e.target.value)} />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments ? blog.comments.map(comment => <li key={comment}>{comment}</li>) : null}
      </ul>
    </div>
  )
}

export default Comments
