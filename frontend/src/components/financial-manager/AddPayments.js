import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'



export default function AddPayment() {

    const [isLoading, setLoading] = useState(false);

    const [paymentName, setpaymentName] = useState("");
    const [invoiceNum, setinvoiceNum] = useState("");
    const [vehiNum, setvehiNum] = useState("");
    const [paymentMethod, setpaymentMethod] = useState("");
    const [amount, setamount] = useState("");
    const [date, setdate] = useState("");
    const [time, settime] = useState("");

   async function submitData(e) {
    setLoading(true)
        try {
            e.preventDefault();
            if (!paymentName || !invoiceNum || !vehiNum || !paymentMethod || !amount || !date || !time) {
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
                    paymentName,invoiceNum,vehiNum,paymentMethod,amount,date,time

                }
                const data = await (await axios.post("http://localhost:5000/payment/", newDetails)).status
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
            <h3>ADD PAYMENT DETAILS</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">PAYMENT NAME</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setpaymentName(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">INVOICE NUMBER</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setinvoiceNum(e.target.value) }} />
                </div><br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">VEHICLE NUMBER</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setvehiNum(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">PAYMENT METHOD</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setpaymentMethod(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">AMOUNT</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setamount(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">DATE</label>
                    <input type="date" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setdate(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">TIME</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { settime(e.target.value) }} />
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
