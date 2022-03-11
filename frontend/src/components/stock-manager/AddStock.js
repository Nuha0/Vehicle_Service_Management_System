import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert'
import axios from 'axios';
import validation from 'validator'



export default function AddStock() {

    const [isLoading, setLoading] = useState(false);

    const [code, setcode] = useState("");
    const [name, setname] = useState("");
    const [category, setcategory] = useState("");
    const [quantity, setquantity] = useState("");
    const [types, settypes] = useState("");
    const [price, setprice] = useState("");

   async function submitData(e) {
    setLoading(true)
        try {
            e.preventDefault();
            if (!code || !name || !category || !quantity || !types || !price) {
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
                   code,name,category,quantity,types,price

                }
                const data = await (await axios.post("http://localhost:5000/stock/", newDetails)).status
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
            <h3>ADD-STOCK-DETAILS</h3><hr />

            <form class="row g-3 needs-validation" id="inputForm2" novalidate>
                <div class="col-md-6 position-relative">
                    <label for="validationTooltip01" class="form-label">ITEM CODE</label>
                    <input type="text" class="form-control" id="validationTooltip01" required
                        onChange={(e) => { setcode(e.target.value) }} />
                </div>
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip02" class="form-label">ITEM NAME</label>
                    <input type="text" class="form-control" id="validationTooltip02" required
                        onChange={(e) => { setname(e.target.value) }} />
                </div><br />
                <div class="col-md-5 position-relative">
                    <label for="validationTooltip03" class="form-label">CATEGORY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setcategory(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">QUANTITY</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setquantity(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">TYPE</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { settypes(e.target.value) }} />
                </div>
                <div class="col-md-3 position-relative">
                    <label for="validationTooltip03" class="form-label">PRICE</label>
                    <input type="text" class="form-control" id="validationTooltip03" required
                        onChange={(e) => { setprice(e.target.value) }} />
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