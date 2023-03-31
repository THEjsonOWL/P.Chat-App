import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";



const Register = function () {
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confrmpassword: ""
    });

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, [])

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    };
    const handleValidation = () => {
        const { password, confirmPassword, email, username } = values;
        if (password !== confirmPassword) {
            toastOptions.error(
                "Password and Confirm password should be the same",
                toastOptions
            )
        }
        else if (email === "") {
            toastOptions.error(
                "Email Should Be Provided",
                toastOptions
            )
        }
        else if (username.length < 3) {
            toastOptions.error(
                "Username Must Be Greater Than 3 Characters",
                toastOptions
            )
        }
        else if (password.length < 8) {
            toastOptions.error(
                "Password Must Be Greater Than 8 Characters"
            )
        }
        return true;
    }

    const handleSubmit = async () => {
        preventDefault();
        if (handleValidation) {
            const { username, email, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            });
            if (data.status === false) {

                toast.error(data.msg, toastOptions)
            }
            if (data.status === true) {


                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user))
                navigate("/");
            }
        }
    };


    return (
        <>
            <FormContainer>
                <form action="" onSubmit={(event) => handleSubmit(event)}>

                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>Snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm password"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>
                        Already Have An Account ? <Link to="/login">Login</Link>
                    </span>

                </form>
            </FormContainer>
        </>
    )



}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
module.exports = Register;