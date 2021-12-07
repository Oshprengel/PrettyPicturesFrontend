/*
This page contains all the locations
Props to pass:
    allLocations = an object containing all locations currently in the DB 
*/
import { useEffect, useState } from 'react';
import '../stylesheets/locationsstyle.css'
import Location from '../components/Location';
import AddLocation from '../components/AddLocation';
import Loading from '../components/Loading';

function Locations(props) {
  //should hold an object containg all the locations and there info
  const [allLocations, setAllLocations] = useState(null);

  //when true the add location pop up appears
  const [showAdd, setShowAdd] = useState(false)

  //sets show add to the opposite of its current value
  const showAddClick = ()=>{
    setShowAdd((showAdd)?false:true)
  }

  //returns the most recent data about all locations
  const getLocations = async()=>{
    //the backend url that retrieves all locations
    const url = "https://prettyplacesbackend.herokuapp.com/locations"

    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json"
        },
      })
    const response = await data.json()
    setAllLocations(response)
    }
  useEffect(()=>getLocations(), [])

    if(allLocations){
        return ( 
            <>
            {/* onClick makes the addLocation pop up appear */}
            <button class = "add-button" onClick={showAddClick}><span id="big-plus">➕</span>Add a new location</button>
            <AddLocation hide={showAddClick} show={showAdd}/>

            <div id = "locations">   
                {/* For each location create a location component */}
                {allLocations.map(location =><Location id="locations" 
                location={location}
                refresh={getLocations}/>)}
            </div>
            </>
        );
    }else{
        return(
            <Loading/>
        )
    }
}

export default Locations;