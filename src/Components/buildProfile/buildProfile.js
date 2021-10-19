import React,{useState} from 'react'
import axios from 'axios' 

const BuildProfile = () => {
    const [name, setName] = useState("")
    const [dob, setDOB] = useState("")
    const [city, setCity] = useState("")

    onSubmit = async e => {
        e.preventDefault()
        const profile={name, dob, city, sex, preferences, interestedIn};
        console.log(profile)
        alert(profile)
        const response = await axios.post("http://localhost:8080/build-profile/", profile)
        console.log(response)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={name} onChnage={({target})=>setName(target.value)}></input>
                <input type="date" value={dob} onChnage={({target})=>setName(target.value)}></input>
                <input type="text" value={city} onChnage={({target})=>setName(target.value)}></input>
            </form>
        </div>
    )
}

export default BuildProfile