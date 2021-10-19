import React, { useEffect, useState } from "react"
import axios from 'axios'

const SignIn = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [user,setUser] = useState("")
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')

        if(loggedInUser) {
            const foundUser=JSON.parse(loggedInUser)
            setUser(foundUser)
        }
    }, [])

    const onSubmit = async e => {
        // e.preventdefault()
        const user={email, password}
        
        //send new user details to server
        const response = await axios.post("http://localhost:8080/sign-in/", user)

        if(response.data==="true") {
            setUser(user)
        
            //store the user in localStorage
            localStorage.setItem('user', JSON.stringify({email: user.email, password: user.password}))
        }
        else {
            alert("Incorrect Credentials.")
        }
    }

//if user already exists then go to main page
if(user) {
    return (
        <div>
            {user.email} you are logged in and your password is '{user.password}' LOL !
        </div>
    )
}
//else ask to login/sign up
return (
    <form onSubmit={onSubmit}>
        <input type="email" value={email} placeholder="Please enter your email" onChange={({target}) => setEmail(target.value)}></input>
        <input type="password" value={password} placeholder="Enter your password" onChange={({target}) => setPassword(target.value)}></input>
        <button type="submit">Log In</button>
    </form>
)
}

export default SignIn
