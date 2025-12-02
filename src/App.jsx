import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Waterlevel from './pages/Waterlevel.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waterlevel" element={<Waterlevel />} />
      </Routes>
    </Router>
  )
}

export default App
