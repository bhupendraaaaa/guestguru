import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImage from '../Assets/logonavbar.png';
import swal from 'sweetalert';
import { Dropdown } from 'react-bootstrap';

function Navbar() {
  const location = useLocation();

  // Check if the current route is not login or register
  const shouldDisplayNavbar = !['/login', '/register', '/dashboard', '/room_dash'].includes(location.pathname);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check if the user is logged in
    const checkUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/usercheck/', {
          method: 'GET',
          credentials: 'include'
        });
  
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking user:', error);
        setIsLoggedIn(false); // Set isLoggedIn to false in case of an error
      }
    };
  
    // Call checkUser initially
    checkUser();
  }, []);

  const handleLogout = () => {
    swal({
      title: "Are you sure to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        fetch('http://localhost:8000/logout/', {
          method: 'POST',
          credentials: 'include'
        }).then(() => {
          setIsLoggedIn(false); // Update isLoggedIn state after logout
        }).catch(error => {
          console.error('Error logging out:', error);
        });
      }
    });
  };

  return (
    shouldDisplayNavbar && (
      <nav className="navbar">
        <div className="logo-nav">
          <Link to="/">
            <img src={logoImage} alt="Logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/room">Rooms & Suits</Link>
          </li>
          <li>
            <Link to="/facilities">Facilities</Link>
          </li>
          <li>
            <Link to="/event">Event</Link>
          </li>
          <li>
            <Link to="/contact_us">Contact us</Link>
          </li>
          <li>
          <li>
  <Dropdown className="custom-dropdown">
    <Dropdown.Toggle id="dropdown-basic" className="custom-toggle">
      <i className="fa fa-user"></i>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="/dashboard">Admin</Dropdown.Item>
      <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
      <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
      <Dropdown.Item onClick={() => {
        fetch('http://localhost:8000/logout/', {
          method: 'POST',
          credentials: 'include',
        });
        window.location.href = '/home';
      }}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</li>
          </li>
        </ul>
      </nav>
    )
  );
}

export default Navbar;





// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css';
// import logoImage from '../Assets/logonavbar.png';
// import swal from 'sweetalert';

// function Navbar() {
//   const location = useLocation();

//   // Check if the current route is not login or register
//   const shouldDisplayNavbar = !['/login', '/register', '/dashboard', '/room_dash'].includes(location.pathname);

//   const [status, setStatus] = useState(false);

//   const checkUser = async () => {

//     const response = await fetch('http://localhost:8000/usercheck/', {
//       method: 'GET',
//       credentials: 'include'
//     });

//     if (response.status === 200) {
//       setStatus(true);
//     } else {
//       setStatus(false);
//     }
//   }

//   useEffect(() => { checkUser(); }, []);



//   return (
//     shouldDisplayNavbar && (
//       <nav className="navbar">
//         <div className="logo-nav">
//           <Link to="/">
//             <img src={logoImage} alt="Logo" />
//           </Link>
//         </div>
//         <ul className="nav-links">
//           <li>
//             <Link to="/home">Home</Link>
//           </li>
//           <li>
//             <Link to="/room">Rooms & Suits</Link>
//           </li>
//           <li>
//             <Link to="/facilities">Facilities</Link>
//           </li>
//           <li>
//             <Link to="/event">Event</Link>
//           </li>
//           <li>
//             <Link to="/contact_us">Contact us</Link>
//           </li>
//           <li>
            
//           </li>
//           {status === true ? (
//             <li>
//               <i class="fa-solid fa-right-from-bracket" onClick={
//                 () => {
//                   swal({
//                     title: "Are you sure to logout?",
//                     icon: "warning",
//                     buttons: true,
//                     dangerMode: true,
//                   })
//                     .then((willLogout) => {
//                       if (willLogout) {
//                         fetch('http://localhost:8000/logout/', {
//                           method: 'POST',
//                           credentials: 'include'
//                         })
//                       }
//                     });
//                 }
//               }></i>
//             </li>
//           ) : (
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           )}
//           <li />
//           <li />


//         </ul>
//       </nav>
//     )
//   );
// }

// export default Navbar;
