import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewApoinmentDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllApoinments, setAllApoinments] = useState([]);





    //This useEffect function used to get all apoinment's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/apoinment/")).data.data
                setAllApoinments(result);
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
            AllApoinments.filter(items => {
                return items.owner.toLowerCase().includes(search.toLowerCase())
                    || items.nic.toLowerCase().includes(search.toLowerCase())
                    || items.vehecalno.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, AllApoinments])

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
                        <h3>VIEW-Apoinments</h3>
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
                                <th scope="col">OWNER Name</th>
                                <th scope="col">NIC NUMBER</th>
                                <th scope="col">VEHECAL NUMBER</th>
                                <th scope="col">CONTACT NUMBER</th>
                                <th scope="col">REASON</th>
                                <th scope="col">DATE</th>
                                <th scope="col">TIME</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Apoinment) => {
                                return <tr>
                                    <td>{Apoinment.owner}</td>
                                    <td>{Apoinment.nic}</td>
                                    <td>{Apoinment.vehecalno}</td>
                                    <td>{Apoinment.contactno}</td>
                                    <td>{Apoinment.reason}</td>
                                    <td>{Apoinment.date}</td>
                                    <td>{Apoinment.time}</td>
                                    
                                    <td><Link to={"/apoinmentManager/view/" + Apoinment._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
