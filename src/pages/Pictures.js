import { useParams } from "react-router";
import {useEffect, useState} from "react"
import Picture from "../components/Picture";
import AddPicture from "../components/AddPicture";
import { Link } from "react-router-dom";
import '../stylesheets/picturesstyle.css'
import Loading from '../components/Loading';

function Pictures(props) {
    //the location being shown
    const locationName = useParams().location

    //keeps track of all the pictures for the current location
    const [pictures, setPictures] = useState(null)

    //when true the add picture pop up appears
    const [showAdd, setShowAdd] = useState(false)

    //sets show add to the opposite of its current value
    const showAddClick = ()=>{
        setShowAdd((showAdd)?false:true)
    }
    
    //retrieves pictures for a location of a certain and then sets pictures to the response
    const getPictures = async(location) =>{
        const url = `https://prettyplacesbackend.herokuapp.com/locations/${locationName}/`

        const data = await fetch(url, {
            method: "GET",
            headers: {
            "Content-Type": "Application/json"
            },
        })
        const response = await data.json()
        setPictures(response)
    }
    useEffect(()=>getPictures(), [])
    if(pictures){
        return ( 
            <>
                <Link to ="/locations"><button id="back-button"><span id="big-arrow">⟵</span>Back to locations</button></Link>
                {/* onClick makes the addLocation pop up appear */}
                <button className = "add-button" onClick={showAddClick}><span id="big-plus">➕</span>Add a new picture</button>
                <AddPicture hide={showAddClick} show={showAdd} locationName={locationName}/>

                <div id="pictures">
                    {pictures.map(picture => <Picture picture={picture} refresh={getPictures}/>)}``
                </div>
            </>
            );
    }else{
        return(<Loading/>)
    }
}

export default Pictures;