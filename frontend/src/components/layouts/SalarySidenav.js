import React, { useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SalarySideNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/salaryManager/add">ADD SALARY RECORD</Link>
                <Link to="/salaryManager/view">VIEW SALARY DETAILS</Link>
                
            </div>


        </div>
    )
}