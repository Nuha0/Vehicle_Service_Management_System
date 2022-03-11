import React, { useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StockSideNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/stockManager/add">ADD TO STOCK</Link>
                <Link to="/stockManager/view">VIEW STOCK</Link>
                
            </div>


        </div>
    )
}