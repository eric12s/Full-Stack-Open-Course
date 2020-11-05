import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER': {
    return action.data
  }
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    if (user) blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setNotification(`Welcome, ${user.name}`, 'green', 5))

      dispatch({
        type: 'SET_USER',
        data: user
      })
    } catch (e){
      console.log(e)
      dispatch(setNotification('Can\'t log in!', 'red', 5))
    }
  }
}



export default reducer