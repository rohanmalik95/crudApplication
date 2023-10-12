import React, { useEffect, useRef, useState } from "react";
import contact from "./contact.png"
import email from "./email.png"
import workplaceimage from "./workplace.png"
import phoneimage from "./phone.png"
import editcontact from "./editcontact.png"
import deletecontact from "./deletecontact.png"


function ContactItem(props) {

    let [contactlist, setContactlist] = useState([])
    let [form, setForm] = useState(false)
    let [toedit, setToedit] = useState({})
    let [message, setMessage] = useState("")
    // Function to fetch all the notes from the database
    async function getallcontacts() {
        let data = await fetch("http://127.0.0.1:5000/getallcontacts", {
            method: "GET"
        })
        let contacts = await data.json()
        setContactlist(contactlist = contacts)
    }
    useEffect(() => {
        getallcontacts()
    }, [])


    // Function to handle delete request of a contact
    async function handleDelete(id) {
        console.log("deleting note with id " + id)
        let deleteData = await fetch("http://127.0.0.1:5000/deletecontact", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
    }
    let ref = useRef(null)

    // To edit an already exitig contact in the phonebook
    function handleEdit(y) {
        setToedit(toedit = y)
        setForm(!form)
        console.log("vieing to edit state: ")
        console.log(toedit)
    }
    function handlechange(x) {

        let change = x.target.name.substring(4)
        setToedit({ ...toedit, [change]: x.target.value })
        console.log(toedit)
    }
    async function callEditApi() {
        let data = await fetch("http://127.0.0.1:5000/editcontact", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toedit)
        })
        let response = await data.json()
        console.log(response)
    }
    function editrequested() {
        console.log("udpated note")
        console.log(toedit)
        callEditApi()
        window.location.reload()
    }

    return (
        <>
            {
                contactlist.map((e) => {
                    return (
                        <div className="contactdetails">
                            <div className="detailcontainer">
                                <div className="detailspart1">
                                    < img id="contactimgage" src={contact} alt="contactimage" ></img>
                                    <h3 id="contactname">{e.name}</h3>

                                    < img id="phoneimage" src={phoneimage} alt="phoneimage" ></img>
                                    <h3 id="phonenumber">{e.phone}</h3>

                                    < img id="workplaceimgage" src={workplaceimage} alt="worktimage" ></img>
                                    <h3 id="workplacename">{e.company} </h3>

                                    < img id="emailimgage" src={email} alt="contactimage" ></img>
                                    <h3 id="contactemail">{e.email}</h3>
                                </div>

                                <div className="detailspart2">
                                    <div className="editcontact">
                                        < img id="editcontactimage" src={editcontact} onClick={() => handleEdit(e)} alt="contactimage" ></img>
                                    </div>
                                    <div className="deletecontact">
                                        < img id="deletecontactimage" src={deletecontact} onClick={() => handleDelete(e.id)} alt="contactimage" ></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="addoreditcontact" style={{ display: form ? "" : "none" }}>
                <form id="addform" onSubmit={editrequested}>
                    <label htmlFor="nameaddoredit">First name:</label><br />
                    <input ref={ref} id="nameaddoredit" type="text" name="editname" value={toedit.name} onChange={handlechange} /><br />
                    <label htmlFor="emailaddoredit">Email:</label><br />
                    <input ref={ref} id="emailaddoredit" type="text" name="editemail" value={toedit.email} onChange={handlechange} /><br />
                    <label htmlFor="phoneaddoredit">Phone Number:</label><br />
                    <input ref={ref} id="phoneaddoredit" type="text" name="editphone" value={toedit.phone} onChange={handlechange} /><br />
                    <label htmlFor="companyaddoredit">Company:</label><br />
                    <input ref={ref} id="companyaddoredit" type="text" name="editcompany" value={toedit.company} onChange={handlechange} /><br />
                    <button id="formbutton" type="submit">Add/Update</button>
                    <button id="formcancelbutton" type="cancel">Cancel</button>
                </form>
            </div>
        </>
    )
}

export default ContactItem;