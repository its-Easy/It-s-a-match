import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import "../auth/styles.css"

class Navbar extends React.Component {
    render() {
    return (
        <div class='navigate'>
<div class='navigation' style={{margin:"50px"}}>
  <ul>
    <li class='list active'>

      <li>
        <Link to='/news'>
        <span class='icons'><i class="fa fa-home"></i></span>
        <span class='text'>Story</span>
        </Link>
      </li>
    </li>
    <li class='list'>
      <Link to='/signUp'>
        <span class='icons'><i class="fa fa-flash"></i></span>
        <span class='text'>Match</span>
      </Link>
    </li>
    <li class='list'>
      <Link to='/chats'>
        <span class='icons'><i class="fa fa-comment"></i></span>
        <span class='text'>Chats</span>
      </Link>
    </li>
    <li class='list'>
      <Link to='/post'>
        <span class='icons'><i class="fa fa-camera"></i></span>
        <span class='text'>Post</span>
      </Link>
    </li>
    <li class='list'>
      <Link to='/buildProfile'>
        <span class='icons'><i class="fa fa-cog"></i></span>
        <span class='text'>Account</span>
      </Link>
    </li>
    <div class='indicator'></div>
  </ul>
</div>
<div class='list'>
      <li>
        <Link to='/signIn'>
        <span class='icons'><i class="fa fa-sign-in"></i></span>
        <span class='text'> Log In</span>
        </Link>
      </li>
      <li>
        <Link to='/signIn'>
        <span class='icons'><i class="fa fa-sign-out"></i></span>
        <span class='text'> Log Out</span>
        </Link>
      </li>
      </div>
        </div>
    )
    }
}

export default Navbar