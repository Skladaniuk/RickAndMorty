import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/'
})
export default HTTP
