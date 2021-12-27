import React, {useEffect, useState} from 'react'
import axios from 'axios' 

const newPost = () => {
    const [username, setusername] = useState("smartsaral100@gmail.com")
    const [image, setImage] = useState("")

    const handleSubmit = async e => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("username", username);
        formData.append("image", image);

        //ADD IMAGE
        axios.post("/add-image", formDara)
        .then(res =>
            dispatch({
            type: "ADD_IMAGE",
            payload: res.data
            })
        )
        .catch(err =>
            dispatch({
            type: "GET_ERRORS",
            payload: err.response.data
            })
        );
            // history.push("/");
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={({target}) => {setImage(target.value)}}></input>
            <button type="submit">Upload </button>
        </form>
        </>
    )
}