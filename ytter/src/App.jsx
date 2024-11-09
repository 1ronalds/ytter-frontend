import { useState } from 'react'
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Main from './assets/Main.jsx'
import Sidebar from './assets/Sidebar.jsx'
import Logout from './assets/Logout.jsx'

function App() {
  
  const [userType, setUserType] = useState("user");

  const handleLogout = () => {
    setUserType("guest"); 
  }

  return (
    <div className = "container">
    
     <Routes>
        <Route
          path="/"
          element={
            userType === "user" || userType === "admin" 
              ? <Navigate to="/following-feed" replace /> 
              : <Navigate to="/top-feed" replace />
          }
        />
        <Route
          path="/following-feed"
          element={<><Sidebar userType = {userType} view="home" /><Main userType={userType} view="following-feed" /></>}
        />
        <Route
          path="/reyeet-feed"
          element={<><Sidebar userType = {userType} view="home" /><Main userType={userType} view="following-reyeets" /></>}
        />
        <Route
          path="/top-feed"
          element={<><Sidebar userType = {userType} view="home" /><Main userType={userType} view="top-feed" /></>}
        />
        <Route
          path="/new-feed"
          element={<><Sidebar userType = {userType} view="home" /><Main userType={userType} view="new-feed" /></>}
        />
        <Route
          path="/profile"
          element={<><Sidebar userType = {userType} view="profile" /><Main userType={userType} view="profile" /></>}
        />
        <Route
          path="/find-profile"
          element={<><Sidebar userType = {userType} view="find-profile" /><Main userType={userType} view="find-profile" /></>}
        />
        <Route
          path="/notifications"
          element={<><Sidebar userType = {userType} view="notifications" /><Main userType={userType} view="notifications" /></>}
        />
        <Route
          path="/login"
          element={<><Sidebar userType = {userType} view="login" /><Main userType={userType} view="login" /></>}
        />
        <Route
          path="/logout"
          element={<Logout handleLogout={handleLogout} />}
        />
        <Route
          path="/register"
          element={<><Sidebar userType = {userType} view="register" /><Main userType={userType} view="register" /></>}
        />
      </Routes>
    </div>
  )
}

export default App;