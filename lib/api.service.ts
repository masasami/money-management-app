import axios from 'axios'
const apiUrl = process.env.NEXT_PUBLIC_API_URL
axios.interceptors.request.use((config) => {
  config.baseURL = apiUrl
  config.withCredentials = true
  config.headers = {
    api_key: process.env.NEXT_PUBLIC_API_KEY || '',
  }
  return config
})

export const apiService = {
  get: async <T = any>(resource: string) => {
    return (await axios.get<T>(resource)).data
  },
  post: async <T = any>(resource: string, param: { [key: string]: any } | null = null) => {
    return (await axios.post<T>(resource, param)).data
  },
  put: async <T = any>(resource: string, param: { [key: string]: any } | null = null) => {
    return (await axios.put<T>(resource, param)).data
  },
  delete: async <T = any>(resource: string) => {
    return (await axios.delete<T>(resource)).data
  },
}
