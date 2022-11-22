import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000',
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    try {
      const originalRequest = error.config
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true
        const response = await axios.get(`http://localhost:5000/auth/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return api.request(originalRequest)
      }
    } catch (err) {
      console.log('unauthorised', err)
    }
    throw error
  }
)

export default api
