import React, { useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BillSideNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/billingManager/add">ADD BILLING DETAILS</Link>
                <Link to="/billingManager/view">VIEW BILLING DETAILS</Link>
                
            </div>


        </div>
    )
}