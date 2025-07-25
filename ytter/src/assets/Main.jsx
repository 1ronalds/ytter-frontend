import {Link} from 'react-router-dom'
import './Main.css'
import FollowingFeed from './FollowingFeed.jsx'
import NewFeed from './NewFeed.jsx'
import TopFeed from './TopFeed.jsx'
import ReyeetFeed from './ReyeetFeed.jsx'

function Main({userType, view}){

    return (
        <div className="main"><div className="top-menu-box">
        {userType === "guest" && (
         (view === "top-feed" || view === "new-feed") &&
         (<>
          <Link to="/top-feed" className = {view === "top-feed" ? "top-menu selected" : "top-menu"}>Top</Link>
          <Link to="/new-feed" className = {view === "new-feed" ? "top-menu selected" : "top-menu"}>New</Link>
         </>
         ))}
         {
         userType === "user" && (
            (view === "top-feed" || view === "new-feed" || view === "following-feed" || view === "following-reyeets") && 
            (<>
                <Link to="/following-feed" className = {view === "following-feed" ? "top-menu selected" : "top-menu"}>Following posts</Link>
                <Link to="/reyeet-feed" className = {view === "following-reyeets" ? "top-menu selected" : "top-menu"}>Following reyeets</Link>
                <Link to="/top-feed" className = {view === "top-feed" ? "top-menu selected" : "top-menu"}>Top</Link>
                <Link to="/new-feed" className = {view === "new-feed" ? "top-menu selected" : "top-menu"}>New</Link>
               </>))
        }
        </div>
        <div>
        {(view === "following-feed") && <FollowingFeed />}
        {(view === "reyeet-feed") && <ReyeetFeed />}
        {(view === "top-feed") && <TopFeed />}
        {(view === "new-feed") && <NewFeed />}
        </div>
        </div>
    )
}
export default Main;