import './App.css';
import Login from "./pages/LogIn"
import Home from "./pages/Home"
import AdminPage from "./pages/AdminPage"
import Highscore from "./pages/Highscore"
import { Routes, Route, BrowserRouter } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/Home" element={<Home></Home>}></Route>
        <Route path="/AdminPage" element={<AdminPage></AdminPage>}></Route>
        <Route path="/Highscore" element={<Highscore></Highscore>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
