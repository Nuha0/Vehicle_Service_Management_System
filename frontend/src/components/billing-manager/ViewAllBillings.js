import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewBillingDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllBillings, setAllBillings] = useState([]);





    //This useEffect function used to get all billing data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/bill/")).data.data
                setAllBillings(result);
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
            AllBillings.filter(items => {
                return items.serviceId.toLowerCase().includes(search.toLowerCase())
                    || items.serName.toLowerCase().includes(search.toLowerCase())
                    
            })
        )
       
    }, [search, AllBillings])

    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Service ID", "Service Name", "Vehicle Category","Discount","Price"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.serviceId,
                ticket.serName,
                ticket.vehiCat,
                ticket.disAvail,
                ticket.serPrice
                
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
                        <h3>BILLING DETAILS</h3>
                        <button type="button" class="btn btn-outline-info" id="pdfButton" onClick={(e) => { generatePDF(AllBillings) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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
                                <th scope="col">SERVICE ID</th>
                                <th scope="col">SERVICE NAME</th>
                                <th scope="col">VEHICAL CATEGORY</th>
                                <th scope="col">DISCOUNT</th>
                                <th scope="col">PRICE</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Bill) => {
                                return <tr>
                                    <td>{Bill.serviceId}</td>
                                    <td>{Bill.serName}</td>
                                    <td>{Bill.vehiCat}</td>
                                    <td>{Bill.disAvail}</td>
                                    <td>{Bill.serPrice}</td>
                                    
                                    
                                    <td><Link to={"/billingManager/view/" + Bill._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}