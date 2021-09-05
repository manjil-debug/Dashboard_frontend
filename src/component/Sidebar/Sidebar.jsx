import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
    return (
        <div>
            <ul>
                <li><Link to="/" className="link">Dashboard</Link></li>
                <li><Link to="/users" className="link">Users</Link></li>
                <li><Link to="/subs" className="link">Subcriptions</Link></li>
            </ul>    
        </div>
    )
}

