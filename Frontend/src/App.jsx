import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profilepage from './Profilepage.jsx';
import Chatpage from './chatpage.jsx';
import Home from './Home.jsx';
import Clubhome from './culbhomepage.jsx';
import Fac from './faculpage.jsx';
import Event from './eventpage.jsx';



function App() {
  const [ques, setques] = useState(0)

  return (
  <>
  
  <Router>
      <Routes>
          <Route path="/" element={<Home setques = {setques} />} />
          <Route path="/chat" element={<Chatpage ans = {ques} setques = {setques} />} /> 
           <Route path="/faculty" element={<Fac/>} />
          <Route path="/events" element={<Event />} />
          <Route path="/club" element={<Clubhome />} />  
          <Route path="/profile" element={<Profilepage />} />  

        </Routes>
    </Router> 
  
  </>
  )
}

export default App
