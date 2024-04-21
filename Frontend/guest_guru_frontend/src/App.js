//import logo from './logo.svg';
import "./App.css";
import Login from "./components/LoginSignup/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import SnackBar from './components/SnackBar/SnackBar';
import Register from "./components/LoginSignup/Register";
import Home from "./components/Pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Rooms from "./components/Pages/Rooms";
import Footer from "./components/Footer/Footer";
import Description from "./components/Description/Description";
import Contact from "./components/ContactUS/Contact";
import Dashboard from "./components/Admin/Dashboard";
import RoomDash from "./components/Admin/Room-Dash";
import Userlist from "./components/Admin/Userlist";
import Facilities from "./components/Facilities/Facilities";
import BookingList from "./components/Admin/BookingList";
import Currencyconverter from "./components/Currency/Currencyconverter";
import LanguageTranslator from "./components/Language/LanguageTranslator";
import About from "./components/Pages/About";
import FacilitiesDash from "./components/Admin/Facilities-Dash";

function App() {
  var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/662216a1a0c6737bd12e032b/1hrqigqnr";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState('');

  // const openSnackbar = (message) => {
  //   setSnackbarMessage(message);
  //   setSnackbarOpen(true);
  // };

  // const closeSnackbar = () => {
  //   setSnackbarOpen(false);
  // }

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/room" element={<Rooms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact_us" element={<Contact />} />
          <Route path="/room-dash" element={<RoomDash />} />
          <Route path="/user" element={<Userlist />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/booking" element={<BookingList />} />
          <Route path="/currency" element={<Currencyconverter />} />
          <Route path="/translator" element={<LanguageTranslator />} />
          <Route path="/about" element={<About/>} />
          <Route path="/facilitites-dash" element={<FacilitiesDash />} />
        </Routes>
        <Footer />
      </Router>
      {/* <SnackBar open={snackbarOpen} message={snackbarMessage} handleClose={closeSnackbar}/> */}
    </div>
  );
}

export default App;
