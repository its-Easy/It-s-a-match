import React, {useState } from "react";
import axios from "axios"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [RePassword, setRePassword] = useState("")
    const [OTP, setOTP] = useState("")

    const onSubmit = async e => {
        e.preventDefault()
        if(RePassword !== password) {
            alert("Passwords do not match :(")
            return;
        }
        const user={email, password}
        const response = await axios.post("http://localhost:8080/sign-up/", user)
        console.log(response)
        alert("Enter the OTP sent to your e-mail")
    }
    const OTPVerification = async e => {
        e.preventDefault()
        
        const userOTP={email, OTP}
        console.log(userOTP)
        const response = await axios.post("http://localhost:8080/sign-up/verify", userOTP)
        console.log(response)

        //store the user in localStorage
        localStorage.setItem('user', JSON.stringify({email: email, password: password}))
    }

    return (
        <form onSubmit={OTPVerification}>
        <input type="email" value={email} placeholder="Please enter your email" onChange={({target}) => setEmail(target.value)}></input>
        <input type="password" value={password} placeholder="Enter your password" onChange={({target}) => setPassword(target.value)}></input>
        <input type="password" value={RePassword} placeholder="Re-Enter your password" onChange={({target}) => setRePassword(target.value)}></input>
        <input type="number" value={OTP} placeholder="Enter the OTP sent to your e-mail" onChange={({target}) => setOTP(target.value)}></input>
        <button type="button" onClick={onSubmit}>Log In</button>
        <button type="submit">Submit OTP</button>
        </form>
    )
}

export default SignUp