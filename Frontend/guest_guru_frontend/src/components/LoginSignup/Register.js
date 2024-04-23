import React, { useState } from 'react';
import './Register.css';
import logoImage from '../Assets/logo192.png';
import { useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Form } from 'react-bootstrap';

function Register() {
  const navigate = useNavigate();
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  // const [role, setRole] = useState('guest');
  const role = 'guest';

  const handleRegister = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('firstname', fname);
    formData.append('lastname', lname);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('role', role);

    let register = 'http://localhost:8000/registration/'

    let registerResponse = await fetch(register, {
      method: 'POST',
      body: formData
    });

    let parsedData = await registerResponse.json();
    console.log(parsedData);


    if (registerResponse.status === 201) {
      swal({
        title: "Registration Successful",
        text: "You have successfully registered",
        icon: "success",
        button: "Ok",
      });
      setFName('');
      setLName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setAddress('');
      navigate("/");
      return;
    }

    else {
        swal({
          title: "Registration Failed",
          text: "Invalid credentials",
          icon: "error",
          button: "Ok",
        });
    }
  }
  


  return (
    <div>
      <div className="logo-reg">
        <a href="/">
          <img src={logoImage} alt="" width="180px" />
        </a>
      </div>

      <div className='container-reg'>
        <div className="header-reg">
          <div className="text-reg">Register</div>
          <div className="underline-reg"></div>
        </div>
      <Form onSubmit={handleRegister}>
        <div className="inputs-reg">
          <div className='text-field-reg'>
            <div>
              <p>First Name</p>
              <input required className="design-reg" type='text' placeholder='Enter Your First Name' value={fname} onChange={(e) => setFName(e.target.value)} />
            </div>

            <div>
              <p>Last Name</p>
              <input required className="design-reg" type='text' placeholder='Enter Your Last Name' value={lname} onChange={(e) => setLName(e.target.value)} />
            </div>
          </div>

          <div className='text-field-reg'>
            <div>
              <p>Email</p>
              <input required className="design-reg" type='text' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <p>Phone</p>
              <input required className="design-reg" type='text' pattern="\d*" placeholder='Enter Your Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className='text-field-reg'>
            <div>
              <p>Address</p>
              <input required className="design-reg" type='text' placeholder='Enter Your Email' value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
              <p>Password</p>
              <input required className="design-reg" type='text' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="register-cointainer">
          <div className="register">
            <input type="submit" value="Register" />
          </div>
        </div>
        <div className="haveaccount-register">
          Already have an account?
          <Link to="/login">
            <span>Log In</span>
          </Link>
        </div>
      </Form>
      </div>
    </div>
  );
}

export default Register;
