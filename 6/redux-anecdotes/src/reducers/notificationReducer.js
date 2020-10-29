let clear = null

export const setNotification = (content, sec) => {
  return async dispatch => {
    if(clear) clearTimeout(clear)
    dispatch({
      type: 'SET',
      data: {
        content
      }
    })
    clear = setTimeout(() => {
      dispatch({
        type: 'SET',
        data: {
          content: ''
        }
      })
    }, sec * 1000)
  }
}

const initialState = 'Welcome to Anecdotes App'
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      state = action.data.content
      return state
    default:
      return state
  }
}

export default reducer