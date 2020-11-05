import React, { useState } from 'react'
import { addCommentAct } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setcomment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentAct(blog, comment))
  }

  return(
    <div>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Control value={comment} onChange={(e) => setcomment(e.target.value)} />
        <Button type='submit'>add comment</Button>
      </Form>
      <ul>
        {blog.comments ? blog.comments.map(comment => <li key={comment}>{comment}</li>) : null}
      </ul>
    </div>
  )
}

export default Comments
