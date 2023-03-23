import React, { useState, useEffect } from "react";
import { GetByLocTM } from "../helpers/EventsApi/GetByLocTM";
import Checkbox from "@mui/material/Checkbox";
import "./chooseEvents.css";
import { useNavigate } from "react-router-dom";
import NextBar from "./NextBar";
import ClientAPI from "../helpers/ClientAPI";
import Local from "../helpers/Local";
import addEventsToDB from "../helpers/Utils/addEventsToDB";
import LocationDropdown from "./Registration/LocationDropdown";
import takeEventDetails from "../helpers/Utils/takeEventDetails";
import Form from "./Form";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EventCard from "./EventCard";




function ChooseEvents() {
  const navigate = useNavigate();
  const userInfo = Local.getUser();
  const userLocation = userInfo.location;
  const [events, setEvents] = useState();
  const [showEvents, setShowEvents] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [chosenEvents, setChosenEvents] = useState([]);
  const [location, setLocation] = useState(); 
  // const [eventDetails, setEventDetails] = useState([])
  const [showTitle, setShowTitle]= useState(true);
  const [locationInput, setLocationInput]= useState("")
  const [dblocation, setDbLocation] = useState(userInfo.location); 

    //Loads with user's current country in DB when loading    
    useEffect(() => {
    getLocation();
  }, []);

  //gets user location from local storage and sets it
  async function getLocation() {
    await getEvents(userLocation);
  }

    //location submits on typing
    const handleChange = event => {
        // setLocation(event.target.value);
        setLocationInput(event.target.value);
      };
    
      //show or don't show abiity to edit
    function handleEditButton(){
        setShowEdit(true);
        setShowTitle(false);
    }  

    // async function handleFormLocation(e){
    //     e.preventDefault();
    //     // await getEvents(location)
    //     // console.log("events set as:", events)
    //     getEvents(locationInput)
    //     setLocation(locationInput)
    //     setShowEdit(false);
    //     setShowTitle(true);
    //   };
    
  const handleLocationChange = async (form) => {
    await getEvents(form.location);
    setLocation(form.location);
    setShowEdit(!showEdit);
    console.log("events set as:", events);
  };

     
    async function getEvents(location){
        let userId= userInfo.userId
        let results = await GetByLocTM(location);
      let otherResults= await results.map((result) =>  
                      {let eventdetails = takeEventDetails(result, location, userId);
                       return eventdetails});
        console.log("other Results" , otherResults)
  
        await setEvents(otherResults);
         setShowEvents(true);  
    };
       

  function handleCheckBoxChange(event) {
    let eventId = event.target.value;
    let checkedEvents = [...chosenEvents];
    console.warn(checkedEvents);
    if (checkedEvents.includes(eventId)) {
      let idIndex = checkedEvents.indexOf(eventId);
      checkedEvents.splice(idIndex, 1);
      setChosenEvents(checkedEvents);
    } else {
      checkedEvents.push(eventId);
      setChosenEvents(checkedEvents);
    }
    console.log(chosenEvents);
  }

  // function handleCheckBoxChange(event){
//     let eventId= event.target.value;
//     let checkedEvents= [...chosenEvents]
//     if (checkedEvents.includes(eventId)){
//       let idIndex= checkedEvents.indexOf(eventId);
//       checkedEvents.splice(idIndex,1);
//       setChosenEvents(checkedEvents);
//     }else {
//       checkedEvents.push(eventId)
//       setChosenEvents(checkedEvents);
//     }
//     console.log(chosenEvents);
//  }


  
  async function handleSend(){
    let newEvents= await addEventsToDB(chosenEvents, events, userInfo.userId); 
    console.log("The detail events resp", newEvents) 
    navigate("/matched")
  }
 

  return (
    <div>
      <div>
        <h2 className="choose-events">
          Events Near&nbsp;
          {!showEdit && (
            <>
              {location}
              <IconButton color="secondary" aria-label="Search">
                <EditIcon
                  onClick={() => {
                    setShowEdit(!showEdit);
                  }}
                />
              </IconButton>
            </>
          )}
          {showEdit && (
            <Form
              formInitialValues={{ location: "" }}
              onFormChange={handleLocationChange}
            >
              <LocationDropdown
                label="Location"
                name="location"
                defaultValue={userLocation}
              />
            </Form>
          )}
        </h2>
      </div>
      {showEvents && (
        <div className="show-choose-events">
          <div className="results-choose-events">
            {events.map((r) => {
              return (
                <div key={r.id} className="event-items">
                  <Checkbox
                    className="event-checkbox"
                    value={r.id}
                    onChange={handleCheckBoxChange}
                    inputProps={{
                      "aria-label": "Checkbox A",
                    }}
                  />
                  <EventCard r={r} />
                  {/* <img src={r.image} alt="" className="event-img" />
                  <p className="event-title">{r.name}</p>
                  <p className="event-date-time">
                    {r.date} | {r.time}
                  </p>
                  <p className="event-venue">{r.venue}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <NextBar
        activeStep={1}
        nextCb={(e) => {
          handleSend();
        }}
        prevCb={() => {
          navigate("/register-two");
        }}
      />
    </div>
  );
}

export default ChooseEvents;
