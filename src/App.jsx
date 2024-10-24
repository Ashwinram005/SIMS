import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { LandingPage } from "./pages/Landingpage"
import { StudentDetails } from "./pages/StudentDetails"  
import { createContext, useEffect, useState } from "react"
import { DeleteStudent } from "./pages/DeleteStudent"
import EditStudent from "./pages/EditStudent";

export const AppContext = createContext();

function App() {
  const savedActiveItem = localStorage.getItem('activeItem')
  const [activeItem, setActiveItem] = useState(savedActiveItem);
  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);
  return (
    <>
      <AppContext.Provider value={{ activeItem, setActiveItem }}>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/landing" element={<LandingPage/>}/>
                <Route path="/studentdetail/:id" element={<StudentDetails/>} />
                <Route path="/studentdelete/:id" element={<DeleteStudent/>} />
                <Route path="/studentedit/:id" element={<EditStudent />} />
            </Routes>
        </Router>
      </AppContext.Provider>
    </>
  )
}

export default App
