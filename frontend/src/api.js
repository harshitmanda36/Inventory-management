import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  console.log('Making request to:', config.url)
  console.log('Token exists:', !!token)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
    console.log('Token length:', token.length)
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data)
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function setToken(token) {
  localStorage.setItem('token', token)
}
export function getToken() { return localStorage.getItem('token') }
export function logout() { localStorage.removeItem('token') }

export async function login(email, password) {
  const { data } = await api.post('/api/auth/login', { email, password })
  setToken(data.token)
  return data
}

export async function registerUser(name, email, password) {
  const { data } = await api.post('/api/auth/register', { name, email, password })
  setToken(data.token)
  return data
}

export async function listItems() {
  const { data } = await api.get('/api/items')
  return data
}

export async function createItem(item) {
  const { data } = await api.post('/api/items', item)
  return data
}

export async function updateItem(id, item) {
  const { data } = await api.put(`/api/items/${id}`, item)
  return data
}

export async function deleteItem(id) {
  console.log('Deleting item with ID:', id)
  try {
    await api.delete(`/api/items/${id}`)
    console.log('Delete successful')
  } catch (error) {
    console.error('Delete failed:', error)
    throw error
  }
}
