import React, { useEffect, useState } from "react";
import  { Link } from 'react-router-dom'
import axios from "axios"
import styles from "./styles.css"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [RePassword, setRePassword] = useState("")
    const [OTP, setOTP] = useState("")
    const [user, setUser] = useState("")

    useEffect(() => {
        const loggedInUser = localStorage.getItem('authtoken')
        const checkUser = async e => {
            if(loggedInUser) {
                const response = await axios.post("http://localhost:8080/sign-in/verify-token", {token: loggedInUser})

                if(response.data) {
                    alert("user already exists")
                    setUser("ok")
                }
            }
        }
        checkUser()
    }, [])

    const onSubmit = async e => {
        e.preventDefault()
        if(RePassword !== password) {
            alert("Passwords do not match :(")
            return;
        }
        document.getElementsByClassName("submit-otp-btn")[0].style.display = 'block';
        document.getElementsByClassName("send-otp-btn")[0].style.display = 'none';
        document.getElementsByClassName("input-otp")[0].style.display = 'block';
        const user={email, password}
        alert("Enter the OTP sent to your e-mail")
        const response = await axios.post("http://localhost:8080/sign-up/", user)
        console.log(response)
    }
    const OTPVerification = async e => {
        e.preventDefault()
        
        const userOTP={email, OTP}
        console.log(userOTP)
        const response = await axios.post("http://localhost:8080/sign-up/verify", userOTP)
        console.log(response)

        //store the user in localStorage
        localStorage.setItem('authtoken', response.data._id)
    }

    if(user==="ok")
    return (
        window.location.href="/news"
    )
    else
    return (
        <div class="signUpcontainer">
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <h2 class="text-center text-dark mt-5">SignUp Form</h2>
            <div class="card my-5">

            <form class="card-body cardbodyColor p-lg-5" onSubmit={OTPVerification}>
                <div class="text-center">
                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profileImagePic img-thumbnail rounded-circle my-3"
                    width="200px" alt="profile"/>
                </div>

                <div class="mb-3">
                <input type="email" value={email} onChange={({target}) => setEmail(target.value)} class="form-control" id="Username" aria-describedby="emailHelp" placeholder="E-mail"/>
                </div>
                <div class="mb-3">
                <input type="password" value={password} onChange={({target}) => setPassword(target.value)} class="form-control" id="password" placeholder="Password"/>
                </div>
                <div class="mb-3">
                <input type="password" value={RePassword} onChange={({target}) => setRePassword(target.value)} class="form-control" id="password" placeholder="Confirm your Password"/>
                </div>
                <div class="mb-3">
                <input type="number" value={OTP} onChange={({target}) => setOTP(target.value)} class="form-control input-otp" placeholder="Enter the OTP sent to your email" style={{display:"none"}}/>
                </div>
                <div class="text-center">
                    <button type="button" onClick={onSubmit} className="send-otp-btn">Send OTP</button>
                    <button type="submit" class="btn btnColor px-5 mb-5 w-100 submit-otp-btn" style={{display:"none"}}>Submit OTP</button>
                </div>
                <div id="emailHelp" class="form-text text-center mb-5 text-dark">
                Already Registered? <Link to="/signIn" class="text-dark fw-bold" className={styles.a}> Log In</Link>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
    )
}

export default SignUp
