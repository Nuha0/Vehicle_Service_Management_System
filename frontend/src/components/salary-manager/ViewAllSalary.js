import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewSalaryDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllSalary, setAllSalary] = useState([]);





    //This useEffect function used to get all orderingt's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/salary/")).data.data
                setAllSalary(result);
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
            AllSalary.filter(items => {
                return items.emp_name.toLowerCase().includes(search.toLowerCase())
                    || items.emp_nic.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, AllSalary])

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
                        <h3>VIEW-SALARYIES</h3>
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
                                <th scope="col">EMPLOYEE Name</th>
                                <th scope="col">EMPLOYEE ID</th>
                                <th scope="col">BASSIC SALARY</th>
                                <th scope="col">OT RATE</th>
                                <th scope="col">TOTAL SALARY</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Salary) => {
                                return <tr>
                                    <td>{Salary.emp_name}</td>
                                    <td>{Salary.emp_nic}</td>
                                    <td>{Salary.emp_salary}</td>
                                    <td>{Salary.ot_rate}</td>
                                    <td>{Salary.total_salary}</td>
                                    
                                    
                                    <td><Link to={"/salaryManager/view/" + Salary._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
