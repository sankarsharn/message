import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
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

    const { username, email, password } = formData
    if (!username || !email || !password) {
      setError('All fields are required')
      return
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        navigate('/login')
      } else {
        setError(data.message || 'Signup failed')
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
          Sign up for WhatsChat
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
            value={formData.username}
          />
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
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup
