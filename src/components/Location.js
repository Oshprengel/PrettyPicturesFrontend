/*
    This represents a location icon
    PROPS TO PASS:
        location = a single location instance
*/

import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../stylesheets/locationstyle.css'
function Location(props) {
    //for redirecting
    const navigate = useNavigate()
    //tracks whether caption is typeable or not
    const[typeable, setTypeable] = useState(false)

    //tracks the contents of the caption 
    const [caption, setCaption] = useState(props.location.caption)

    //handles changes within the caption while editing 
    const handleCaptionChange = (event)=>{
        setCaption(event.target.value)
    }

    //makes the caption of the location typeable
    const handleEditClick = (event)=>{
        event.preventDefault()
        if(typeable){
            setCaption(props.location.caption)
            setTypeable(false)
        }else{
            setTypeable(true)
        }
    }

    //handles an edit submit
    const handleEdit =  async(event)=>{
        event.preventDefault()
        setTypeable(false)
        const url = "https://prettyplacesbackend.herokuapp.com/locations"
        fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "Application/json",
            },
            body:JSON.stringify({
                id:props.location.id,
                caption:caption
                }
            )
        })
    }

    //prevents the link from redirecting if the user is typing in the form
    const redirect = (event)=>{
        navigate(`/locations/${props.location.name}`)
    }
    //handles a delete request
    const handleDelete = async()=>{
        console.log(props.location.id)
        const url = "https://prettyplacesbackend.herokuapp.com/locations"
        await fetch(url, {
            method:"DELETE",
            headers: {
                "Content-Type": "Application/json",
              },
            body: JSON.stringify({
                id:props.location.id
            }) 
        })
        props.refresh()
    }

    return (
        <>
            <div className="location">
            <button id="edit-button" onClick={handleEditClick}>
            {typeable?<>╳ Cancel Edit</>:<>✎ Edit</>}</button>|
            <button id="delete-button" onClick={handleDelete}>╳ Delete</button>
            <div onClick={typeable?null:redirect}>
            <h1>{props.location.name}</h1>
            <img src={props.location.thumbnail}/>
            {/* if typeable is true then present a form to edit the caption otherwise display the caption in a p tag */}
            {(typeable)?(
                <form onSubmit={handleEdit}>
                    <input type="text" value={caption} onChange={handleCaptionChange} name="caption"/>
                    <input type="submit" value="submit edit"/>
                </form>
                ):(
                <p>{caption}</p>)}
            </div>
        </div>
        </>
     );
}

export default Location;