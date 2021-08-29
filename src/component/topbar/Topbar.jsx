import React from 'react'
import './Topbar.css'
import {Link} from 'react-router-dom'

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topwrapper">
            <div className="topleft">
                <h1><Link to="/" className="link">Dashboard</Link></h1>
            </div>
            <div className="topright">
            <ul>
                <li><Link to="/users" className="link">Users</Link></li>
                <li><Link to="/subs" className="link">Subcriptions</Link></li>
                <li><Link to="/page" className="link">pagitation table</Link></li>
            </ul>
            </div>
            </div>
        </div>
    )
}
