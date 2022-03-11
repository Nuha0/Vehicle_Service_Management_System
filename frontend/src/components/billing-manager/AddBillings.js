import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';




export default function AddBilling() {

    const [isLoading, setLoading] = useState(false);

    const [serviceId, setserviceId] = useState("");
    const [serName, setserName] = useState("");
    const [vehiCat, setvehiCat] = useState("");
    const [disAvail, setdisAvail] = useState("");
    const [serPrice, setserPrice] = useState("");
    

   async function submitData(e) {
    setLoading(true)
        try {
            e.preventDefault();
            if (!serviceId || !serName || !vehiCat || !disAvail || !serPrice) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            } else {
                const newDetails = {
                    serviceId,serName,vehiCat,disAvail,serPrice

                }
                const data = await (await axios.post("http://localhost:5000/bill/", newDetails)).status
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
            <h3>ADD-BILLING-DETAILS</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">SERVICE ID</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setserviceId(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">SERVICE NAME</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setserName(e.target.value) }} />
                </div><br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">VEHECAL CATEGORY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setvehiCat(e.target.value) }} />
                </div>
                <div class="col-md-4 position-relative">
                    <label for="validationTooltip03" class="form-label">DISCOUNT</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setdisAvail(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">PRICE</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setserPrice(e.target.value) }} />
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
