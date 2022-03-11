import React, { useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ApointSideNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/apoinmentManager/add">ADD APOINMENT</Link>
                <Link to="/apoinmentManager/view">VIEW APOINMENTS</Link>
                
            </div>


        </div>
    )
}