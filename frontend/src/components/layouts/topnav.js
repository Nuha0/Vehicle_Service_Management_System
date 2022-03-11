import axios from 'axios'
import React from 'react'
import "./TopNav.css"
import "./SideNav.css"
import { Link } from 'react-router-dom';



export default function topnav() {

    return (
        <div>
            <div id="navbar">
                <a href="#default" id="logo">BUDDHIKA MOTORS</a>
                <div id="navbar-right">
                    <a class="active" href="/"><i class="fa fa-fw fa-home"></i> Home</a>
                    <a href="#"><i class="fa fa-eject"></i> About</a>
                    <a href="#"><i class="fa fa-fw fa-wrench"></i> Services</a>
                    <a href="#"><i class="fa fa-fw fa-envelope"></i>Contact</a>
                    <a href="#"><i class="fa fa-fw fa-user"></i>Feedback</a>
                </div>
            </div>
            <div class="sidebar">
                <Link to="/apoinmentManager">APPOINMENT MANAGEMENT</Link>
                <Link to="/serviceListManager">SERVICE LIST MANAGEMENT</Link>
                <Link to="/employeeManager">EMPLOYEE MANAGEMENT</Link>
                <Link to="/orderManager">ORDER MANAGEMENT</Link>
                <Link to="/stockManager">STORE MANAGEMENT</Link>
                <Link to="/salaryManager">SALARY MANAGEMENT</Link>
                <Link to="/billingManager">BILLING MANAGEMENT</Link>
                <Link to="/paymentManager">PAYMENT MANAGEMENT</Link>
                
                
            </div>

        </div>
    )
}

