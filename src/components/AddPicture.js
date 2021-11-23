import React, { useState } from 'react';
import "../stylesheets/addstyle.css"

function AddPicture(props) {
    //tracks the state of the form 
    const [form, setForm] = useState({
        link:"",
        caption:"",
        location:props.locationName
    })

    //handles changes within the form
    const handleChange = (event) =>{
        setForm({...form,[event.target.name]:event.target.value })
    }

    //handles submission of the form
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const url = "http://localhost:8000/pictures"
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body:JSON.stringify(form)
        })
        window.location.reload(true);
    }
    return (props.show)?(
    <div className="add-picture">
        <div className="add-picture-inner">
            <button className="cancel-add" onClick={props.hide}>cancel</button>
            <h1>New Picture</h1>
            <form onSubmit={handleSubmit}>
                <h3>Link</h3>
                <input type="text" name="link" value={form.name} onChange={handleChange} required="required"/>
                <h3>Caption</h3>
                <input type="text" name="caption" value={form.caption} onChange={handleChange} required="required"/>
                <input id = "submit" type="submit"/>
            </form>
        </div>
    </div> ):"";
}

export default AddPicture;