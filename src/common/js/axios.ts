import axios from 'axios'

const instance = axios.create({})

instance.interceptors.response.use(function (response) {
  const { data } = response
  if (data.code === 1) return data
  return Promise.reject(data.message)
})

export default instance
