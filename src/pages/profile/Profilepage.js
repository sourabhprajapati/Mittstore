import React from 'react'
import "./profilepage.css"
import Header from '../../components/header/Header'
import Profile from '../../components/Profile/Profile'
import SchoolProfile from '../../components/Seprofiles/Seprofiles'
import Seprofiles from '../../components/Seprofiles/Seprofiles'

const Profilepage = () => {
  return (
    <div>
        <Header/>
        {/* <Profile/> */}
        {/* <SchoolProfile/> */}
        <Seprofiles/>
    </div>
  )
}

export default Profilepage