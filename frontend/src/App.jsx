import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
