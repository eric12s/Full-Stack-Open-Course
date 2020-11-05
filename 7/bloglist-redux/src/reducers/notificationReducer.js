let clear = null

export const setNotification = (content, color, sec) => {
  return async dispatch => {
    if(clear) clearTimeout(clear)
    dispatch({
      type: 'SET',
      data: {
        content,
        color
      }
    })
    clear = setTimeout(() => {
      dispatch({
        type: 'SET',
        data: {
          content: '',
          color: 'white'
        }
      })
    }, sec * 1000)
  }
}

const initialState = {
  content: 'Welcome to Bloglist App',
  color: 'green'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET':
    state = action.data
    return state
  default:
    return state
  }
}

export default reducer