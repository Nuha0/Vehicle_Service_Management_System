import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewFeedbacks() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllFeedbacks, setAllFeedbacks] = useState([]);





    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/feedback/")).data.data
                setAllFeedbacks(result);
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
            AllFeedbacks.filter(items => {
                return items.mail.toLowerCase().includes(search.toLowerCase())
                    || items.message.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, AllFeedbacks])


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Mileage", "Service"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.mail,
                ticket.message
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("FEEDBACK-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`FEEDBACK-Report_${dateStr}.pdf`);

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
                        <h3>VIEW-EMPLOYEE-FEEDBACKS</h3>
                        <button type="button" className="btn btn-outline-info" id="pdfButton" onClick={(e) => { generatePDF(AllFeedbacks) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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
                                <th scope="col">Feedback</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Feedback) => {
                                return <tr>
                                    <td>{Feedback.mail}</td>
                                    <td> {Feedback.message} </td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
