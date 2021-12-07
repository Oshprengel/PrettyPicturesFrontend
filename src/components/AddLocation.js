import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import "../stylesheets/addstyle.css"

function AddLocation(props) {
    //for redirecting
    let navigate = useNavigate()
    //tracks the state of the form 
    const [form, setForm] = useState({
        name:"",
        caption:"",
        country:"",
        continent:"",
    })

    //handles changes within the form
    const handleChange = (event) =>{
        setForm({...form,[event.target.name]:event.target.value })
    }

    //handles submission of the form
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const url = "https://prettyplacesbackend.herokuapp.com/locations"
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body:JSON.stringify(form)
        })
        navigate(`/locations/${form.name}`)
    }
    return (props.show)?(
    <div className="add-location">
        <div className="add-location-inner">
            <button className="cancel-add" onClick={props.hide}>cancel</button>
            <h1>New Location</h1>
            <form onSubmit={handleSubmit}>
                <h3>Name</h3>
                <input type="text" name="name" value={form.name} onChange={handleChange} required="required"/>
                <h3>Caption</h3>
                <input type="text" name="caption" value={form.caption} onChange={handleChange} required="required"/>
                <input id = "submit" type="submit"/>
            </form>
        </div>
    </div> ):"";
}

export default AddLocation;