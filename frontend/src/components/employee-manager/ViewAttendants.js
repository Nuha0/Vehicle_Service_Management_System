import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewFeedbacks() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [allAttendants, setallAttendants] = useState([]);





    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/attendant/")).data.data
                setallAttendants(result);
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
            allAttendants.filter(items => {
                return items.mail.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, allAttendants])


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["User Mail", "Start Time", "End Time"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.mail,
                ticket.startTime,
                ticket.endTime
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Employee-Attendant-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Employee-Attendant-Report_${dateStr}.pdf`);

    }


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
                        <h3>VIEW-ATTENDANTS</h3>
                        <button type="button" className="btn btn-outline-info" id="pdfButton" onClick={(e) => { generatePDF(allAttendants) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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
                                <th scope="col">User Mail Address</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Attendant) => {
                                return <tr>
                                    <td>{Attendant.mail}</td>
                                    <td> {Attendant.startTime} AM</td>
                                    <td> {Attendant.endTime} PM</td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
