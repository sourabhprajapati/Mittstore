import React from 'react'
import "./profilepage.css"
import Header from '../../components/header/Header'
import Profile from '../../components/Profile/Profile'
import SchoolProfile from '../../components/seProfile/SchoolProfile'
import SeProfile from '../../components/SchoolProfile/SeProfile'
const Profilepage = () => {
  return (
    <div>
        <Header/>
        {/* <Profile/> */}
        {/* <SchoolProfile/> */}
        <SeProfile/>
    </div>
  )
}

export default Profilepage