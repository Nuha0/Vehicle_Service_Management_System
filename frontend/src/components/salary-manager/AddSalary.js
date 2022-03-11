import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'



export default function AddSalary() {

    const [isLoading, setLoading] = useState(false);

    const [emp_name, setemp_name] = useState("");
    const [emp_nic, setemp_nic] = useState("");
    const [emp_salary, setemp_salary] = useState("");
    const [ot_rate, setot_rate] = useState("");
    const [total_salary, settotal_salary] = useState("");
    

   async function submitData(e) {
    setLoading(true)
        try {
            e.preventDefault();
            if (!emp_name || !emp_nic || !emp_salary || !ot_rate || !total_salary ) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }/* else if (!validation.isVehecalno(vehecalno)) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please enter valid time",
                    icon: "error",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }*/else {
                const newDetails = {
                   emp_name,emp_nic,emp_salary,ot_rate,total_salary

                }
                const data = await (await axios.post("http://localhost:5000/salary/", newDetails)).status
                if(data === 200){
                    SoloAlert.alert({
                        title: "Welcome!",
                        body: "Data added successfully",
                        icon: "success",
                        theme: "dark",
                        useTransparency: true,
                        onOk: function () {
    
                        },
                    });
                }

            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    function clear() {

    }
    return (
        <div className="content">
            <h3>ADD-SALARY-DETAILS</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">EMPLOYEE NAME</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setemp_name(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">EMPLOYEE ID</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setemp_nic(e.target.value) }} />
                </div><br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">EMPLOYEE SALARY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setemp_salary(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">OT RATE</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setot_rate(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">TOTAL SALARY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { settotal_salary(e.target.value) }} />
                </div>
                

                <div class="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => { clear(e) }}><i class="fa fa-ban"></i> Clear form</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Submit form'}</button>
                </div>
            </form>

        </div>
    )
}
