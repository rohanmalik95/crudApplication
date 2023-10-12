import React, { useEffect, useState } from "react";
import ContactItem from "./ContactItem.js"
import "./design.css"
function MainPage() {
    let [addview, setAddview] = useState(false)
    let [newcontact,setNewcontact]=useState({})
    // function to call the add api
    async function addContact() {
        let dataToAdd = await fetch("http://127.0.0.1:5000/addcontact", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newcontact )
        })
        console.log(dataToAdd)
    }
    function calltoadd(z) {
        z.preventDefault();
        console.log(z.email)
        alert(z.email)

    }
    function handleaddclick() {
        setAddview(!addview)
    }

    function calltoadd(e) {
        console.log(newcontact)
        addContact();
    }

    function handlechange(e)
    {
        setNewcontact({...newcontact,[e.target.name]:e.target.value})
    }

    return (<>
        <div className="header">
            <h4 id="headername">My Phone Book</h4>
            <div className="addnew" onClick={() => handleaddclick()}>
                <p>+</p>
            </div>
        </div>
        <ContactItem></ContactItem>
        <div className="addcontact" style={{ display: addview ? "" : "none" }}>
            <form id="addform" onSubmit={calltoadd}>
                <label htmlFor="emailadd">Name:</label><br />
                <input id="nameadd" type="text" name="name" onChange={handlechange}/><br />
                <label htmlFor="emailadd">Email:</label><br />
                <input id="emailadd" type="text" name="email" onChange={handlechange}/><br />
                <label htmlFor="phoneadd">Phone Number:</label><br />
                <input id="phoneadd" type="text" name="phone" onChange={handlechange}/><br />
                <label htmlFor="companyadd">Company:</label><br />
                <input id="companyadd" type="text" name="company" onChange={handlechange}/><br />
                <button id="formaddbutton" type="submit" >Add</button>
                <button id="formcancelbutton" type="close" onClick={() => handleaddclick()}>Cancel</button>
            </form>
        </div>
    </>
    )
}

export default MainPage;
