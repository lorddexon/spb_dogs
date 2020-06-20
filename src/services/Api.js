import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://dog.ceo/api/',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
