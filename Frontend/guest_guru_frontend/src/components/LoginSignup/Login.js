import React, { useState } from "react";
import "./Login.css";
import logoImage from "../Assets/logo192.png";
import { useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import swal from "sweetalert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    let login = "http://localhost:8000/login/"; // Backend API  URL for login

    let loginResponse = await fetch(login, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let parsedData = await loginResponse.json();
    console.log(parsedData);

    if (loginResponse.status === 200) {
      if (parsedData.role === "admin") {
        swal({
          title: "Login Successful",
          text: "Admin Panel successfully logged in",
          icon: "success",
          button: "Ok",
        });
        navigate("/dashboard");
      } else {
        swal({
          title: "Login Successful",
          text: "You have successfully logged in",
          icon: "success",
          button: "Ok",
        });
        navigate("/");
      }
    } else {
      if (parsedData.email) {
        alert(parsedData.email);
      } else if (parsedData.password) {
        alert(parsedData.password);
      } else {
        swal({
          title: "Login Failed",
          text: "Invalid Email or Password",
          icon: "error",
          button: "Ok",
        });
      }
    }
  };
  return (
    <div>
      <div className="logo">
        <a href="/">
          <img src={logoImage} alt="" width="200px" />
        </a>
      </div>

      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
      <Form onSubmit={handleLogin}>
        <div className="inputs">
          <div className="text-field">
            <p>Email</p>
            <input
              required
              className="design"
              type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-field">
            <p>Password</p>
            <input
              required
              className="design"
              type="text"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
    

        <div className="submit-cointainer">
          <div className="submit">
            <input type="submit" value="Login" />
          </div>
        </div>
        <div className="haveaccont">
          Does not have account?
          <Link to="/register">
            <span>Register</span>
          </Link>
        </div>
      </Form>
      </div>
    </div>
  );
}

export default Login;
