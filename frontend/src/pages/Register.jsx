import { useState } from 'react'
import { registerUser } from '../api.js'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await registerUser(name, email, password)
      navigate('/')
    } catch (err) {
      setError('Registration failed. Email may already be in use.')
    }
  }

  return (
    <div className="card">
      <h2>Create Account</h2>
      <form className="grid" onSubmit={onSubmit}>
        <label>Name
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
        </label>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="min 6 chars" required />
        </label>
        {error && <div className="badge" style={{color:'salmon'}}>{error}</div>}
        <button type="submit">Register</button>
      </form>
      <p style={{marginTop:12}}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
