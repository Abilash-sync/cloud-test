import { useAuth } from '../auth/AuthContext.jsx'

export default function Dashboard() {
  const { user, logout } = useAuth()
  return (
    <div style={{ maxWidth: 680, margin: '10vh auto', padding: 24 }}>
      <h1>Dashboard</h1>
      <p>You are signed in as <strong>{user?.email}</strong>.</p>
      <button onClick={logout}>Sign out</button>
    </div>
  )
}
