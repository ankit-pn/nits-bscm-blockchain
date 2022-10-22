import NavContainer from "./components/navbar/NavContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dummy from "./components/Dummy";
import F404 from "./components/navbar/404";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <NavContainer/>
      <Routes>
        <Route exact path='/' element={< Dummy />}></Route>
        <Route path='/user/*' element={< Auth />}></Route>
        <Route exact path='*' element={< F404 />}></Route>
        
      </Routes>

    </Router>
  );
}



export default App;
