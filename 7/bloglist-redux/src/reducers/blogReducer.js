import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG': {
    const blog = action.data
    return state.concat(blog)
  }
  case 'UPDATE_BLOG': {
    const blog = action.data
    return state.filter((item) => item.id !== blog.id).concat(blog)
  }
  case 'REMOVE_BLOG': {
    const blog = action.data
    return state.filter((item) => item.id !== blog.id)
  }
  default:
    return state
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`, 'green', 5))
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.update(blog, blog.id)
      dispatch({
        type: 'UPDATE_BLOG',
        data: blog
      })
    } catch (err) {
      blog.likes -= 1
      dispatch(setNotification(`Can't add a like to ${blog.title}!`, 'red', 5))
    }
  }
}

export const removeBlogAct = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(setNotification(`${blog.title} is removed successfully!`, 'green', 5))
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog
      })
    } catch (err) {
      dispatch(setNotification(`Can't remove ${blog.title}!`, 'red', 5))
    }
  }
}

export const addCommentAct = (blog, comment) => {
  return async dispatch => {
    try {
      const res = await blogService.addComment(blog, comment)
      dispatch(setNotification('The comment is added successfully!', 'green', 5))
      dispatch({
        type: 'UPDATE_BLOG',
        data: res
      })
    } catch (e) {
      dispatch(setNotification('Can\'t add the comment!', 'red', 5))
    }
  }
}

export default reducer
