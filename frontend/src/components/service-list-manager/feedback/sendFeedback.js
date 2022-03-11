import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function SendFeedback() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllEmployees, setAllEmployees] = useState([]);

    const [mail, setmail] = useState("");
    const [message, setmessage] = useState("");






    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/employee/")).data.data
                setAllEmployees(result);
                setLoaderStatus(true)
                setTableStatus(false)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    },[])


    //This useEffect method is used to perform a searching function
    useEffect(() => {
        setfiltered(
            AllEmployees.filter(items => {
                return items.fName.toLowerCase().includes(search.toLowerCase())
                    || items.lName.toLowerCase().includes(search.toLowerCase())
                    || items.mail.toLowerCase().includes(search.toLowerCase())
            })
        )

    }, [search, AllEmployees])


    function selectUser(employee) {
        setmail(employee.mail);
    }

    async function sendFeedback(e) {
        e.preventDefault();
        console.log(mail, message)
        const feddback = {
            mail, message
        }
        const data = await (await axios.post("http://localhost:5000/feedback/", feddback)).status;
        if (data === 200) {
            SoloAlert.alert({
                title: "Welcome!",
                body: "Feedback send!",
                icon: "success",
                theme: "dark",
                useTransparency: true,
                onOk: function () {

                },
            });
        }
    }

    return (
        <div class="content">


            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem", marginTop: "100px" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Send Feedback</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">To:</label>
                                    <input type="text" class="form-control" id="recipient-name" value={mail} />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Message:</label>
                                    <textarea class="form-control" id="message-text" onChange={(e) => { setmessage(e.target.value) }}></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={(e) => { sendFeedback(e) }}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>




            <div hidden={tebleStatus}>{/* This part used to get all users data into table */}
                <nav className="navbar bg-white" >
                    <div className="container-fluid">
                        <h3>SEND-FEEDBACK</h3>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={e => { setsearch(e.target.value) }} />
                        </form>
                    </div>
                </nav><hr />

                <div className="bodyContent">
                    <table className="table table-white table-hover">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Mail Address</th>
                                <th scope="col">Department</th>
                                <th scope="col">Employee Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Employee) => {
                                return <tr>
                                    <td>{Employee.fName}</td>
                                    <td> {Employee.lName} </td>
                                    <td>{Employee.mail}</td>
                                    <td> {Employee.Department} </td>
                                    <td>{Employee.TypeofEmployee}</td>
                                    <td><button type="button" class="btn btn-outline-dark" data-bs-toggle="tooltip" onClick={(e) => { selectUser(Employee) }}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" data-bs-placement="top" title="Send feedback using this">
                                        <i class="fa fa-comments"></i>  Send feedback
                                    </button></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
