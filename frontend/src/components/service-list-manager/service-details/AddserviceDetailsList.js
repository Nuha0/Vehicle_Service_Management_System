import React, { useState, useEffect } from 'react'
import '../Home.css'
import SoloAlert from 'soloalert'
import axios from 'axios';



export default function AddserviceDetailsList() {
    const [isLoading, setLoading] = useState(false);


    const [Mileage, setMileage] = useState("");
    const [Services, setService] = useState("");
    
   async function submitData(e) {
       e.preventDefault();
        setLoading(true);  
        try{
            if (!Services || !Mileage) {
                SoloAlert.alert({
                    title: "Oops!",
                    body: "Please fill all fields",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {

                    },
                });
            }else{
            console.log(Services)
            const newDetails = {
                Mileage,
                Services
            }
            const data = await (await axios.post("http://localhost:5000/repair/", newDetails)).status
            if(data === 200){
                SoloAlert.alert({
                    title: "Welcome!",
                    body: "Details added successfully",
                    icon: "success",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        clear();
                    },
                  });
            }else{
                SoloAlert.alert({
                    title: "Oops!",
                    body: "User added successfully",
                    icon: "warning",
                    theme: "dark",
                    useTransparency: true,
                    onOk: function () {
                        clear();
                    },
                  });
            }
        }
        }catch(err){

        }
        setLoading(false);
    }


    function clear(){
        setMileage("");
        setService("");
    }
    return (
        <div class="content">

            <h3>ADD-SERVICE-DETAILS</h3><hr />
            <form class="row g-3 needs-validation" id="inputForm" novalidate>
                <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">Mileage</label>
                    <input type="number" class="form-control" id="validationCustom01" required 
                     onChange={(e) => { setMileage(e.target.value); }}/>
                </div>
                <div class="col-md-3">
                    <label for="validationCustom04" class="form-label">Type</label>
                    <select class="form-select" id="validationCustom04" required>
                        <option selected disabled value="">Choose...</option>
                        <option >MILEAGE</option>
                    </select>
                    <div class="invalid-feedback">
                        Please select a valid state.
                    </div>
                </div>
                <div class="col-md-7">
                    <label for="validationCustom03" class="form-label">Service</label>
                    <textarea type="text" class="form-control" id="validationCustom03" required
                     onChange={(e) => { setService(e.target.value); }}  />
                    <div class="invalid-feedback">
                        Please provide a valid city.
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label class="form-check-label" for="invalidCheck">
                            Agree to terms and conditions
                        </label>
                    </div>
                </div>
                <div class="col-12" id="btngrp">
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{clear()}}><i class="fa fa-ban"></i> Close</button>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-primary" onClick={(e) => { submitData(e) }}
                        disabled={isLoading} ><i class="fa fa-file-export"></i>  {isLoading ? 'Sending..' : 'Submit form'}</button>
                </div>
            </form>

        </div>
    )
}
