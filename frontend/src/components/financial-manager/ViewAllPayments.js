import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewPaymentDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllPayments, setAllPayments] = useState([]);





    //This useEffect function used to get all payment data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/payment/")).data.data
                setAllPayments(result);
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
            AllPayments.filter(items => {
                return items.invoiceNum.toLowerCase().includes(search.toLowerCase())
                    
            })
        )
       
    }, [search, AllPayments])

    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Payment Name", "Invoice Number", "Vehicle Number","Payment Method","Amount","Date","Time"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.paymentName,
                ticket.invoiceNum,
                ticket.vehiNum,
                ticket.paymentMethod,
                ticket.amount,
                ticket.date,
                ticket.time
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Payment-Details-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Payment-Details-Report_${dateStr}.pdf`);

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
                        <h3>VIEW PAYMENTS</h3>
                        <button type="button" class="btn btn-outline-info" id="pdfButton" onClick={(e) => { generatePDF(AllPayments) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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
                                <th scope="col">PAYMENT NAME</th>
                                <th scope="col">INVOICE NUMBER</th>
                                <th scope="col">VEHICLE NUMBER</th>
                                <th scope="col">PAYMENT METHOD</th>
                                <th scope="col">AMOUNT</th>
                                <th scope="col">DATE</th>
                                <th scope="col">TIME</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Payment) => {
                                return <tr>
                                    <td>{Payment.paymentName}</td>
                                    <td>{Payment.invoiceNum}</td>
                                    <td>{Payment.vehiNum}</td>
                                    <td>{Payment.paymentMethod}</td>
                                    <td>{Payment.amount}</td>
                                    <td>{Payment.date}</td>
                                    <td>{Payment.time}</td>
                                    
                                    <td><Link to={"/paymentManager/view/" + Payment._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
