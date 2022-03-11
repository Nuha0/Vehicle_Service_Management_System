import React, { useState, useEffect } from 'react'
import "./SideNav.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PaymentSideNAV() {

    return (

        <div>

            <div class="sidebar">
                <Link to="/paymentManager/add">ADD PAYMENT DETAILS</Link>
                <Link to="/paymentManager/view">VIEW PAYMENT DETAILS</Link>
                
            </div>


        </div>
    )
}