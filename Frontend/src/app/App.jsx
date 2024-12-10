import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";
import PreviewPage from "../pages/PreviewPage";
import DonatePage from "../pages/DonatePage";


function App() {

  return (
    <Router>
      <Routes>
       <Route index path="/" element={<WelcomePage />} />
       <Route path="/home" element={<HomePage />} />
       <Route path="/preview" element ={<PreviewPage />} />
       <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </Router>
  )
}

export default App
