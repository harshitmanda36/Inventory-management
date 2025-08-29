import { useState } from 'react'
import { login } from '../api.js'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form className="grid" onSubmit={onSubmit}>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        </label>
        {error && <div className="badge" style={{color: 'salmon'}}>{error}</div>}
        <button type="submit">Sign In</button>
      </form>
      <p style={{marginTop:12}}>No account? <Link to="/register">Register</Link></p>
    </div>
  )
}
