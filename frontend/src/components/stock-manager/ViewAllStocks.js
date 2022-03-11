import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SoloAlert from 'soloalert'
import validation from 'validator'
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function ViewStockDetails() {

    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [search, setsearch] = useState("");
    const [filtered, setfiltered] = useState([]);

    const [AllStocks, setAllStocks] = useState([]);





    //This useEffect function used to get all stock's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get("http://localhost:5000/stock/")).data.data
                setAllStocks(result);
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
            AllStocks.filter(items => {
                return items.code.toLowerCase().includes(search.toLowerCase())
                    || items.name.toLowerCase().includes(search.toLowerCase())
                    || items.category.toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, AllStocks])

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
                        <h3>VIEW-StockS</h3>
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
                                <th scope="col">ITEM CODE</th>
                                <th scope="col">NAME</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">TYPE</th>
                                <th scope="col">PRICE</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {filtered.slice(0).reverse().map((stock) => {
                                return <tr>
                                    <td>{stock.code}</td>
                                    <td>{stock.name}</td>
                                    <td>{stock.category}</td>
                                    <td>{stock.quantity}</td>
                                    <td>{stock.types}</td>
                                    <td>{stock.price}</td>
                                    
                                    <td><Link to={"/stockManager/view/" + stock._id} className="Edit"> <i className="far fa-edit"></i> </Link></td>
                                </tr>

                            })}
                        </tbody>
                    </table>

                </div>

            </div>{/* End of the */}
        </div>
    )
}