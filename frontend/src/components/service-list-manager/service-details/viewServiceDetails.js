import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewServiceDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [Mileage, setMileage] = useState("");
    const [Services, setService] = useState("");

    const [AllServices, setAllService] = useState([]);





    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/repair/")).data.data
                setAllService(result);
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
            AllServices.filter(items => {
                return items.Mileage.toLowerCase().includes(search.toLowerCase())
                    || items.Services.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, AllServices])


    //This function used to generate a pdf
    function generatePDF(tickets) {
        const doc = new jspdf();
        const tableColumn = ["Mileage", "Service"];
        const tableRows = [];

        tickets.slice(0).reverse().map(ticket => {
            const ticketData = [
                ticket.Mileage,
                ticket.Services
            ];
            tableRows.push(ticketData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        doc.text("Service-Details-Report", 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${dateStr} `, 14, 23);
        doc.save(`Service-Details-Report_${dateStr}.pdf`);

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
                        <h3>VIEW-SERVICES</h3>
                        <button type="button" className="btn btn-outline-info" id="pdfButton" onClick={(e) => { generatePDF(AllServices) }}><i className="fa fa-file-pdf"></i>  PDF</button>
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
                                <th scope="col">Mileage</th>
                                <th scope="col">Services</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((Service) => {
                                return <tr>
                                    <td>{Service.Mileage}</td>
                                    <td> {Service.Services} </td>
                                    <td><Link to={"/serviceListManager/view/" + Service._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}
