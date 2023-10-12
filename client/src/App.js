import "./App.css";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import PageNotFound from "./pages/PageNotFound.js";
import Register from "./pages/Auth/Register.js"
import Login from "./pages/Auth/Login.js"
import FaceScanner from "./pages/Auth/FaceScanner.js"
import DashBoard from "./pages/user/DashBoard.js"
import Private from "./components/Routes/Private.js"
import ForgotPassword from "./pages/Auth/ForgotPassword.js"
function App() {
  return (
    <Routes>
    <Route path="/dashboard" element={<Private/>}>
      <Route path="" element={<DashBoard/>} />
    </Route>
    <Route path="/" element={<HomePage/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/FaceScanner" element={<FaceScanner/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
