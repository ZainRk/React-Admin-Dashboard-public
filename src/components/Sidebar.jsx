import React from 'react'
import './Sidebar.css'
import Logo from '../imgs/logo.png'
import {UilEstate, UilClipboardAlt, UilUsersAlt, UilPackage, UilChart, UilSignOutAlt} from '@iconscout/react-unicons'
const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="logo">
            <img src={Logo} alt="logo"/>
            <span>Sh<span>o</span>ps</span>
        </div>
        <div className="menu">
            <div className="menuItem active">
                <UilEstate/>
                <span>Dashboard</span>
            </div>
            <div className="menuItem">
                <UilClipboardAlt/>
                <span>Orders</span>
            </div>
            <div className="menuItem">
                <UilUsersAlt/>
                <span>Customers</span>
            </div>
            <div className="menuItem">
                <UilPackage/>
                <span>Products</span>
            </div>
            <div className="menuItem">
                <UilChart/>
                <span>Analytics</span>
            </div>
            <div className="menuItem">
                <UilSignOutAlt/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar