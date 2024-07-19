import "./App.css";
import Login from "./component/Login";
import Home from "./component/Home";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from "./component/Signup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
