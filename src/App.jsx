import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { LandingPage } from "./pages/Landingpage"
import { StudentDetails } from "./pages/StudentDetails"  
import { useState } from "react"

function App() {
  const [activeItem, setActiveItem] = useState('ho');
  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/landing" element={<LandingPage activeItem={activeItem} setActiveItem={setActiveItem}/>}/>
              <Route path="/student/:id" element={<StudentDetails setActiveItem={setActiveItem}/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App
