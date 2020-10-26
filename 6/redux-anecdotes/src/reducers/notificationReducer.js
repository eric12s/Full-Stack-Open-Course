export const setNotification = (content) => {
  return ({
    type: 'SET',
    data: {
      content
    }
  })
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