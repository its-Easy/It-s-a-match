import React,{useState} from 'react'
import axios from 'axios' 
import img from './invalidUrl.png'

const invalidURL = () => {
    return (
        <img src={img}></img>
    )
}

export default invalidURL