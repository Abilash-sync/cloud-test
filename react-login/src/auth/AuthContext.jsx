import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('auth')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.token) {
          setUser(parsed.user || { email: parsed.email })
          setToken(parsed.token)
        }
      } catch {}
    }
    setLoading(false)
  }, [])

  const login = async ({ email, password, remember = true }) => {
    // Simulate an API call
    await new Promise((r) => setTimeout(r, 600))

    // Very basic demo auth rule: any email with password 'password123' works
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    if (password !== 'password123') {
      throw new Error('Invalid credentials')
    }

    const fakeToken = Math.random().toString(36).slice(2)
    const newUser = { email }

    setUser(newUser)
    setToken(fakeToken)

    if (remember) {
      localStorage.setItem('auth', JSON.stringify({ token: fakeToken, user: newUser }))
    }

    return { user: newUser, token: fakeToken }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth')
  }

  const value = useMemo(() => ({ user, token, loading, login, logout, isAuthenticated: !!token }), [user, token, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
