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
import Contact from './components/ContactUS/Contact';
import Dashboard from './components/Admin/Dashboard';
import RoomDash from './components/Admin/Room-Dash';
import Userlist from './components/Admin/Userlist';
import Facilities from './components/Facilities/Facilities';





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
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/contact_us' element={<Contact/>}/>
      <Route path='/room_dash' element={<RoomDash/>}/>
      <Route path='/user' element={<Userlist/>}/>
      <Route path='/facilities' element={<Facilities/>}/>
      </Routes>
      <Footer/>
    </Router>
      
      
      
    </div>
  );
}

export default App;
