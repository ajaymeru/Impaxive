import React from 'react'
import Sidebar from './Sidebar'
import logo from "./logo.png"   
import CreateActivity from './CreateActivity'
import "./styles/Home.scss"

const Home = () => {
    return (
        <div className='home'>
            <div className="navbar">
                <img src={logo} alt="" />
                <h5>client</h5>
            </div>
            <div className="content">
                <Sidebar />
                <CreateActivity />
            </div>
        </div>
    )
}

export default Home