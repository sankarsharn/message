import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { email, password } = formData
    if (!email || !password) {
      setError('All fields are required')
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        navigate('/dashboard')
      } else {
        setError(data.message || 'Login failed')
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Welcome back to WhatsChat!</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.password}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signin
