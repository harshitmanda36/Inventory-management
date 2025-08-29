import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { getToken, logout } from './api.js'

function ProtectedRoute({ children }) {
  const token = getToken()
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const navigate = useNavigate()
  const token = getToken()

  return (
    <div className="container">
      <nav>
        <div className="row">
          <Link to="/"><strong>Inventory Manager</strong></Link>
          
        </div>
        <div className="row">
          {token ? (
            <button className="secondary" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="badge">Login</Link>
              <Link to="/register" className="badge">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
