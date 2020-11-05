import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

// const update = async (user, id) => {
//   const response = await axios.put(`${baseUrl}/${id}`, user)
//   return response.data
// }

export default { getAll, create }