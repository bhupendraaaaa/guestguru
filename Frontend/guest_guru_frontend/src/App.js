//import logo from './logo.svg';
import './App.css';
import Login from './components/LoginSignup/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/LoginSignup/Register';
import Home from './components/Pages/Home';
import Navbar from './components/Navbar/Navbar';
import Rooms from './components/Pages/Rooms';
import Footer from './components/Footer/Footer';
import Description from './components/Description/Description';


function App() {
  return (
    <div>
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/room' element={<Rooms/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/description/:id' element={<Description/>}/>
      </Routes>
      <Footer/>
    </Router>
      
      
      
    </div>
  );
}

export default App;
