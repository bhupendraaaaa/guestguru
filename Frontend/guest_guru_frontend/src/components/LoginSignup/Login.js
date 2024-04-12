import React, { useState } from 'react';
import './Login.css';
import logoImage from '../Assets/logo192.png'
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        let login = 'http://localhost:8000/login/'  // Backend API  URL for login 
        
        let loginResponse = await fetch(login, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        let parsedData = await loginResponse.json();
        console.log(parsedData);

        if (loginResponse.status === 200) {
            alert('Login Successful');
            navigate("/");
        }

        else {
            if (parsedData.email) {
                alert(parsedData.email);
            }
            else if (parsedData.password) {
                alert(parsedData.password);
            }
            else {
                alert('Invalid Credentials');
            }
        }


    }
    return (

        <div>
            <div className="logo">
                <a href="/">
                    <img src={logoImage} alt="" width="200px" />
                </a>
            </div>


            <div className='container'>
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>


                <div className="inputs">
                    <div className='text-field'>
                        <p>Email</p>
                        <input className="design" type='text' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='text-field'>
                        <p>Password</p>
                        <input className="design" type='text' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>



                </div>
                <div className="forget-password">
                    Forget Password? <span>Click here</span>
                </div>

                <div className="submit-cointainer">
                        <div className="submit" onClick={handleLogin}>
                            Log In
                        </div>
                </div>
                <div className="haveaccont">
                    Does not have account? 
                    <Link to="/register"> 
                    <span>Register</span>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Login;
