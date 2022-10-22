import NavContainer from "./components/navbar/NavContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dummy from "./components/Dummy";
import F404 from "./components/navbar/404";
import Auth from "./pages/Auth";
import Transaction from "./pages/Transactions";
import Entries from "./pages/Entries";


function App() {
  return (
    <Router>
      <NavContainer />
      <Routes>
        <Route exact path='/' element={<div style={{
      background : 'rgba(49,92,206,0.8)'
      ,height : '91vh'

    }}>< Dummy /></div>}></Route>
        <Route exact path='/txn' element={<div style={{
      background : 'rgba(49,92,206,0.8)'
      ,height : '91vh'


    }}>< Transaction /></div>}></Route>
        <Route exact path='/db' element={<div style={{
      background : 'rgba(49,92,206,0.8)'
      ,height : '91vh'


    }}>< Entries /></div>}></Route>
        <Route path='/user/*' element={<div style={{
      background : 'rgba(49,92,206,0.8)'
      ,height : '91vh'


    }}>< Auth /></div>}></Route>
        <Route exact path='*' element={<div style={{
      background : 'rgba(49,92,206,0.8)'
      ,height : '91vh'


    }}>< F404 /></div>}></Route>
        
      </Routes>

    </Router>
  );
}



export default App;



// background : 'rgba(49,92,206,0.8)'