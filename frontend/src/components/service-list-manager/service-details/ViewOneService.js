import React, { useState, useEffect } from 'react'
import '../Home.css'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';


export default function ViewOneService() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);


    const [Mileage, setMileage] = useState("");
    const [Services, setService] = useState("");


    const { id } = useParams();

    //This useEffect function used to get all user's data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/repair/${id}`)).data.data
                setMileage(result[0].Mileage);
                setService(result[0].Services)
                setLoaderStatus(true)
                setTableStatus(false)
                console.log(Mileage)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        try {
            e.preventDefault();
            console.log(Services)
            const newDetails = {
                Mileage,
                Services
            }
            const data = await (await axios.put(`http://localhost:5000/repair/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

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


    //This function is used to delete specific user
    function deleteUser(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:5000/repair/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/serviceListManager/view"
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
                <h3>ADD-SERVICE-DETAILS</h3><hr />
                <form class="row g-3 needs-validation" id="inputForm" novalidate >
                    <div class="col-md-4">
                        <label for="validationCustom01" class="form-label">Mileage</label>
                        <input type="number" class="form-control" id="validationCustom01" defaultValue={Mileage} required
                            onChange={(e) => { setMileage(e.target.value); }} disabled={textState} />
                    </div>
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-7">
                        <label for="validationCustom03" class="form-label">Service</label>
                        <textarea type="text" class="form-control" id="validationCustom03" defaultValue={Services} required
                            onChange={(e) => { setService(e.target.value); }} disabled={textState} />
                        <div class="invalid-feedback">
                            Please provide a valid city.
                        </div>
                    </div>
                    <div class="col-12">
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState1}>
                        <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                            disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState2}>
                        <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={(e) => { deleteUser(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
