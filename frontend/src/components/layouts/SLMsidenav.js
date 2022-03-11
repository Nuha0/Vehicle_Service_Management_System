import React,{ useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SLMSideNav() {
 
    return (

        <div>

            <div class="sidebar">
                <Link to="/serviceListManager/add">ADD SERVICE</Link>
                <Link to="/serviceListManager/view">VIEW SERVICE</Link>
                <Link to="/serviceListManager/feedback">SEND FEEDBACK</Link>
                <Link to="/serviceListManager/feedback/view">VIEW FEEDBACK</Link>


            </div>


        </div>
    )
}
