import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { LandingPage } from "./pages/Landingpage"

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/landing" element={<LandingPage/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
