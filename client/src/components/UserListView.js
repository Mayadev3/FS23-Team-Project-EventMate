import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Local from "../helpers/Local";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClientAPI from "../helpers/ClientAPI";
import UserDialogView from "./UserDialogView";
import NextBar from "./NextBar";

export default function UserListView() {
  const navigate = useNavigate();

  const [matched, setMatched] = useState([]);
  const [open, setOpen] = useState(false);
  const [matchClicked, setMatchClicked] = useState([]);

  useEffect(() => {
    getMatched();
  }, );

  async function getMatched() {
    //Get all events in the events list that I'm going to
    //Get all users going to those events - excluding me

    let matchesToAdd = [];

    let eResponse = await ClientAPI.getUserEvents(Local.getUserId());
    if (eResponse.ok) {

      if (eResponse.data.length > 0) {
        for (let row of eResponse.data) {
          console.log("row: ", row);
          let usersResponse = await ClientAPI.getEventUsers(row.ticketmasterid);
          console.log("userR: ", usersResponse);
          let users = usersResponse.data;
          console.log("users: ", users);
          let otherUsers = users.filter(user => {
            return user.userId === Local.getUserId()
          });
          console.log("others: ", otherUsers);
          if (otherUsers.length > 0) {
            matchesToAdd.push(...otherUsers);
          }
          
        }
        
      }
      
      
    } else {
      console.log("Error!", eResponse.error);
    }


    setMatched(matched => ([...matched, matchesToAdd]));
    console.log("Matched: ", matched);
  }

  // async function getEventUsers(row) {
  //   let usersResponse = await ClientAPI.getEventUsers(row.ticketmasterid);
  //   if (usersResponse.ok) {
  //     
  //     console.log("users2:", users);
  //     
  //     console.log("users3:", otherUsers);
  //     return otherUsers;
  //   } else {
  //     console.log("Error!", usersResponse.error);
  //   }
  // }

  const handleClickOpen = (matchPass) => {
    console.log("t----", matchPass);
    setMatchClicked(matchPass);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMatchClicked(false);
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      sx={{
        width: "80%",
        maxWidth: 800,
        mx: "auto",
        flexDirection: "column",
      }}
    >
      <h2>Your event matches...</h2>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {matched.length > 0 &&
          matched.map((match) => (
            <div>
              <ListItem
                key={match.userId}
              >
                <ListItemAvatar
                  sx={{
                    mr: "15px",
                  }}
                >
                  <Avatar
                    alt={match.username}
                    src={match.avatarURL}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={<div>{match.username}</div>}
                  secondary={
                    <div>
                      <div>Age: {match.age}</div>
                      <div>Gender: {match.gender}</div>
                      <div>Location: {match.location}</div>
                      <div>Event:</div>
                    </div>
                  }
                />

                <Button 
                  variant="outlined"
                  onClick={() => {
                    handleClickOpen(match.userId);
                  }}
                >
                  View Profile
                </Button>

                <Button 
                  variant="outlined"
                  onClick={() => {
                    ClientAPI.invite(Local.getUserId(), match.userId, 1);
                  }}
                >
                  Invite
                </Button>



              </ListItem>
              <Divider component="li" />

              {matchClicked && (
                <UserDialogView
                  open={open}
                  onClose={handleClose}
                  userId={matchClicked}
                />
              )}
            </div>
          ))}


          {
            matched.length <= 0 && 
            <div>No Matches Found</div>
          }
      </List>
      
      <NextBar
        activeStep={3}
        prevCb={() => {
          navigate(`/events`);
        }}
      />
    </Box>
  );
}
