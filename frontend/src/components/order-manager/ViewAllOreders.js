import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewOrderDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllOrders, setAllOrders] = useState([]);





    //This useEffect function used to get all orderingt's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/order/")).data.data
                setAllOrders(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }
       
        getDetails();
    })


    //This useEffect method is used to perform a searching function
    useEffect(() => {
        setfiltered(
            AllOrders.filter(items => {
                return items.dealer_name.toLowerCase().includes(search.toLowerCase())
                    || items.comp_name.toLowerCase().includes(search.toLowerCase())
                    || items.dealer_nic.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, AllOrders])

    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{width: "10rem", height: "10rem",  marginTop:"100px"}} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div hidden={tebleStatus}>{/* This part used to get all users data into table */}
                <nav className="navbar bg-white" >
                    <div className="container-fluid">
                        <h3>VIEW-ORDERS</h3>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">DEALER Name</th>
                                <th scope="col">COMPANY NAME</th>
                                <th scope="col">DEALER NIC</th>
                                <th scope="col">DEALER NUMBER</th>
                                <th scope="col">ITEM NAME</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">QUALITY</th>
                                <th scope="col">PRICE</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((order) => {
                                return <tr>
                                    <td>{order.dealer_name}</td>
                                    <td>{order.comp_name}</td>
                                    <td>{order.dealer_nic}</td>
                                    <td>{order.dealer_no}</td>
                                    <td>{order.items}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.quality}</td>
                                    <td>{order.price}</td>
                                    
                                    <td><Link to={"/orderManager/view/" + order._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
