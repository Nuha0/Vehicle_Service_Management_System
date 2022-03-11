import React, { useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function OrderSideNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/orderManager/add">ADD ORDER</Link>
                <Link to="/orderManager/view">VIEW ORDERS</Link>
                
            </div>


        </div>
    )
}