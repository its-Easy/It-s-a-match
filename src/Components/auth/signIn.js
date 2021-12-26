import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'
import styles from "./styles.css"

const SignIn = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [user, setUser] = useState("")
    
    //check for valid authtoken from localStorage
    useEffect(() => {
        const loggedInUser = localStorage.getItem('authtoken')
        const checkUser = async e => {
            if(loggedInUser) {
                const response = await axios.post("http://localhost:8080/sign-in/verify-token", {token: loggedInUser})

                if(response.data) {
                    setUser("valid")
                }
            }
        }
        checkUser()
    }, [])

    const onSubmit = async e => {
        e.preventdefault()
        const user={email, password}

        //send user details to server
        const response = await axios.post("http://localhost:8080/sign-in/", user)
        console.log(response)
        if(response.data==="false") {
            alert("Incorrect Credentials.")
        }
        else {
            setUser("valid")
            //store the user in localStorage
            localStorage.setItem('authtoken', response.data._id)

            alert("Loggged in successfully !")
        }
    }

//if user already exists then go to main page
if(user==="valid") {
    return (
        window.location.href="/news"
    )
}
//else ask to login/sign up
return (
    <>
    <div class="logIncontainer">
        <div class="row">
        <div class="col-md-6 offset-md-3">
            <h2 class="text-center text-dark mt-5">Login Form</h2>
            <div class="text-center mb-5 text-dark">Made with bootstrap</div>
            <div class="card my-5">

            <form class="card-body cardbodyColor p-lg-5" onSubmit={onSubmit}>
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
                <div class="text-center"><button type="submit" class="btn btnColor px-5 mb-5 w-100">Login</button></div>
                <div id="emailHelp" class="form-text text-center mb-5 text-dark">
                Not Registered? <Link to="/signUp" class="text-dark fw-bold" className={styles.a}> Create an Account</Link>
                </div>
            </form>
            </div>

        </div>
        </div>
    </div>
    </>
)
}

export default SignIn
