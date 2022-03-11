import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';


export default function ViewOneBilling() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);



    const [serviceId, setserviceId] = useState("");
    const [serName, setserName] = useState("");
    const [vehiCat, setvehiCat] = useState("");
    const [disAvail, setdisAvail] = useState("");
    const [serPrice, setserPrice] = useState("");


    const { id } = useParams();

    //This useEffect function used to get all Billing data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/bill/${id}`)).data.data
                setserviceId(result[0].serviceId);
                setserName(result[0].serName)
                setvehiCat(result[0].vehiCat);
                setdisAvail(result[0].disAvail)
                setserPrice(result[0].serPrice);
                

                setLoaderStatus(true)
                setTableStatus(false)
                console.log(serviceId,serName)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        try {
            e.preventDefault();
            const newBill = {
                serviceId,serName,vehiCat,disAvail,serPrice
            }
            const data = await (await axios.put(`http://localhost:5000/bill/${id}`, newBill)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details Updated successfully..",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        window.location = "/billingManager/view"
                    },
                });
            } else {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Something went wrong.. plz try again later",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }
        } catch (err) {

        }

    }

    function edit(e) {
        e.preventDefault();
        setTextState(false)
        setBtnGroupstate1(false)
        setBtnGroupstate2(true)
    }

    function cancel(e) {
        e.preventDefault();
        setTextState(true)
        setBtnGroupstate1(true)
        setBtnGroupstate2(false)
    }


    //This function is used to delete specific Apoinment
    function deleteBilling(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:5000/bill/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Data Deleted Successfully..",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/billingManager/view"
                            },

                        });
                    }
                } catch (err) {
                    SoloAlert.alert({
                        title: "Oops!",
                        body: "Something went wrong",
                        icon: "error",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {

                        },

                    });
                }
            },
            onCancel: function () {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "You canceled delete request",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },

                });
            },

        })
    }
    return (
        <div class="content">

            <div class="d-flex justify-content-center" >
                <div class="spinner-border" role="status" style={{ width: "10rem", height: "10rem" }} hidden={loaderStatus}>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


            <div hidden={tebleStatus}>
                <h3>ADD-BILLING-DETAILS</h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">SERVICE ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={serviceId}
                        onChange={(e) => { setserviceId(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">SERVICE NAME</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={serName}
                        onChange={(e) => { setserName(e.target.value) }} disabled={textState}/>
                </div><br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">VEHICLE CATEGORY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required defaultValue={vehiCat}
                        onChange={(e) => { setvehiCat(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">DISCOUNT</label>
                    <input type="text" class="form-control" id="validationTooltip03" required defaultValue={disAvail}
                        onChange={(e) => { setdisAvail(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">PRICE</label>
                    <input type="text" class="form-control" id="validationTooltip03" required defaultValue={serPrice}
                        onChange={(e) => { setserPrice(e.target.value) }} disabled={textState}/>
                </div>
                

                <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                        <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                            disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                        <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={(e) => { deleteBilling(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                    </div>
            </form>
            </div>

        </div>
    )
}
