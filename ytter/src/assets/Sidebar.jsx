import './Sidebar.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import ytterImage from './image.png'


function Sidebar({userType, view}) {

  return (
    <div className="sidebar">
      <div className="logo">
        <img className="image" src={ytterImage} />
        <p className="ytter">ytter</p>
      </div>
      <ul>
        <li><Link className={view === "home" ? "selected link" : "link"} to="/" >Home</Link></li>
        {userType !== "guest" ? (<li><Link className={view === "profile" ? "selected link" : "link"} to="/profile">Profile</Link></li>) : null }
        <li><Link to="/find-profile" className={view === "find-profile" ? "selected link" : "link"} >Find profile</Link></li>
        {userType !== "guest" ? (<li><Link className={view === "notifications" ? "selected link" : "link"} to="/notifications">Notifications</Link></li>) : null }
        {userType === "admin" ? (<li><Link to="/flagged" className={view === "flagged" ? "selected link" : "link"}>Flagged</Link></li>) : null }
        {userType !== "guest" ? (<li><Link to="/logout" className={view === "logout" ? "selected link" : "link"}>Logout</Link></li>) : 
        (<><li><Link to="/login" className={view === "login" ? "selected link" : "link"}>Login</Link></li>
        <li><Link to="/register" className={view === "register" ? "selected link" : "link"}>Register</Link></li></>)
        }
      </ul>
    </div>
  )
}

export default Sidebar;