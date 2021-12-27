import React, { useEffect, useState } from "react"
import axios from 'axios'

const Chats = () => {
    return (
        <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                {/* <a href='tel:+91-807-788-2109' id="call">
                    <img src="login.jfif"
                        style={{height: "50px",width: "50px",padding: "5px"}}/>
                        </a> */}
            </div>
        </nav>
        <div class="mainbody" style={{display: "flex"}}>

            <div class="card my-3 contactcontainer"
                style={{width: "15rem",margin: "auto",height: "28rem",overflowY: "scroll",flexBasis: "25%",position: "relative"}}>
            </div>

            <div class="rightside" style={{flexBasis: "80%", position: "relative"}}>
                <div class="card my-3 bigcontainer"
                    style={{width: "50rem",margin: "auto",height: "28rem",overflowY: "scroll",position: "relative",display: "block"}}
                    id="bigcontainer">
                </div>

                <div class="card my-2 bigsendcontainer" style={{width: "50rem",margin: "auto",height: "7rem"}}>
                    <div class="card-body">
                        <form action="#" id="sendcontainer">
                            <input type="text" style={{width: "40rem",height: "5rem"}} id="messageinp"
                                placeholder="enter your message here"/>
                            <button class="btn btn-primary" style={{marginLeft: "50px"}} type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}

export default Chats
