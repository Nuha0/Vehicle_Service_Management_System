import React, { useState, useEffect } from 'react'
import SoloAlert from 'soloalert'
import { useParams } from "react-router";
import axios from 'axios';


export default function ViewOneSalary() {

    const [isLoading, setLoading] = useState(false);

    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupstate1] = useState(true);
    const [btngrpState2, setBtnGroupstate2] = useState(false);



    const [loaderStatus, setLoaderStatus] = useState(false);
    const [tebleStatus, setTableStatus] = useState(true);



    const [emp_name, setemp_name] = useState("");
    const [emp_nic, setemp_nic] = useState("");
    const [emp_salary, setemp_salary] = useState("");
    const [ot_rate, setot_rate] = useState("");
    const [total_salary, settotal_salary] = useState("");

    const { id } = useParams();

    //This useEffect function used to get all Salary data
    useEffect(() => {
        async function getDetails() {
            try {
                const result = await (await axios.get(`http://localhost:5000/salary/${id}`)).data.data
                setemp_name(result[0].emp_name);
                setemp_nic(result[0].emp_nic)
                setemp_salary(result[0].emp_salary);
                setot_rate(result[0].ot_rate)
                settotal_salary(result[0].total_salary);
               

                setLoaderStatus(true)
                setTableStatus(false)
                console.log(emp_name,emp_nic)
            } catch (err) {
                console.log(err.message)
            }
        }

        getDetails();
    }, [])


    async function updateData(e) {

        try {
            e.preventDefault();
            const newDetails = {
                emp_name,emp_nic,emp_salary,ot_rate,total_salary
            }
            const data = await (await axios.put(`http://localhost:5000/salary/${id}`, newDetails)).status
            if (data === 200) {
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        window.location = "/salaryManager/view"

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


    //This function is used to delete specific Salary
    function deleteSalary(e) {
        e.preventDefault();

        SoloAlert.confirm({

            title: "Confirm Delete",
            body: "Are you sure",
            theme: "dark",
            useTransparency: true,
            onOk: async function () {

                try {
                    const result = await (await axios.delete(`http://localhost:5000/salary/${id}`)).status
                    console.log(result)

                    if (result === 200) {
                        SoloAlert.alert({
                            title: "Welcome!",
                            body: "Deletion is successful",
                            icon: "success",
                            theme: "dark",
                            useTransparency: true,
                            onOk: function () {
                                window.location = "/salaryManager/view"
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
                <h3>VIEW-SALARY-DETAILS</h3><hr />
                <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">EMPLOYEE NAME</label>
                    <input type="text" class="form-control" id="validationTooltip01" required defaultValue={emp_name}
                        onChange={(e) => { setemp_name(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">EMPLOYEE ID</label>
                    <input type="text" class="form-control" id="validationTooltip02" required defaultValue={emp_nic}
                        onChange={(e) => { setemp_nic(e.target.value) }} disabled={textState}/>
                </div><br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">BASSIC SALARY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required defaultValue={emp_salary}
                        onChange={(e) => { setemp_salary(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">OT RATE</label>
                    <input type="text" class="form-control" id="validationTooltip03" required defaultValue={ot_rate}
                        onChange={(e) => { setot_rate(e.target.value) }} disabled={textState}/>
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">TOTAL SALARY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required defaultValue={total_salary}
                        onChange={(e) => { settotal_salary(e.target.value) }} disabled={textState}/>
                </div>

                <div class="col-12" id="btngrp" hidden={btngrpState1} style={{marginTop:"5%"}}>
                        <button class="btn btn-secondary"><i class="fa fa-ban" onClick={(e) => { cancel(e) }}></i> CANCEL</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-primary" onClick={(e) => { updateData(e) }}
                            disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Updating...' : 'UPDATE'}</button>
                    </div>
                    <div class="col-12" id="btngrp" hidden={btngrpState2}  style={{marginTop:"5%"}}>
                        <button type="submit" class="btn btn-primary" onClick={(e) => { edit(e) }}> <i className="far fa-edit"></i> EDIT</button>&nbsp;&nbsp;&nbsp;
                        <button type="submit" class="btn btn-danger" onClick={(e) => { deleteSalary(e) }}><i class="fa fa-trash"></i>  DELETE</button>
                    </div>
            </form>
            </div>

        </div>
    )
}
