import { useState } from 'react';
import { useNavigate } from 'react-router'
function Picture(props) {
    //for redirecting
    const navigate = useNavigate()
    //tracks whether caption is typeable or not
    const[typeable, setTypeable] = useState(false)

    //tracks the contents of the caption 
    const [caption, setCaption] = useState(props.picture.caption)

    //handles changes within the caption while editing 
    const handleCaptionChange = (event)=>{
        setCaption(event.target.value)
    }

    //makes the caption of the location typeable
    const handleEditClick = (event)=>{
        event.preventDefault()
        if(typeable){
            setCaption(props.picture.caption)
            setTypeable(false)
        }else{
            setTypeable(true)
        }
    }
    //handles an edit submit
    const handleEdit =  async(event)=>{
        setTypeable(false)
        event.preventDefault()
        const url = "https://prettyplacesbackend.herokuapp.com/pictures"
       fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body:JSON.stringify({
                id:props.picture.id,
                caption:caption
                }
            )
        })
    }
    //handles a delete request
    const handleDelete = async()=>{
        console.log(props.picture.id)
        const url = "https://prettyplacesbackend.herokuapp.com/pictures"
        await fetch(url, {
            method:"DELETE",
            headers: {
                "Content-Type": "Application/json",
              },
            body: JSON.stringify({
                id:props.picture.id
            }) 
        })
        props.refresh()
    }

    return ( 
    <div className = "picture">
        <button id="edit-button" onClick={handleEditClick}>{typeable?<>╳ Cancel Edit</>:<> ✎ Edit</>}</button>|
        <button id="delete-button" onClick={handleDelete}>╳ Delete</button>
        <img src={props.picture.link}/>
            {/* if typeable is true then present a form to edit the caption otherwise display the caption in a p tag */}
            {(typeable)?(
                <form onSubmit={handleEdit}>
                    <input type="text" value={caption} onChange={handleCaptionChange} name="caption"/>
                    <input type="submit" value="submit edit"/>
                </form>
                ):(
                <p>{caption}</p>)}
    </div> );
}

export default Picture;