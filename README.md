## EventMate - Full Stack Web Application

EventMate is a platform designed to help you easily discover local events that match your interests. And the best part? You can also browse profiles of people attending those events and chat one-on-one with someone who catches your eye. Who knows, you might just make a new friend or find a great date!

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called team4: `create database team4`
- Add the `.env`, to containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=team4
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table users in your database.

### Development

- Run `npm start` in project directory to start the Express server on port 5002
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

### Features

* User login and registration
* Photo upload
* Personal Profile showing events you are going to and events near you which you can click on to attend
* See people's profiles that are going to the same events you are
* Notifications page where you see the people you invited, who invited you, and rejected invites
* Chat functionality that appears as a button when you and the invitee both confirm going together to the same event

### Technologies

* VS Code
* Express.js
* Node.js
* MySQL
* React.js ( Hooks, States, Context )
* Ticketmaster API
* Pusher API
* Bcrypt
* JSON Web Token
* Mutler 
* MUI


<img width="960" alt="2023-04-08 (26)" src="https://user-images.githubusercontent.com/107764065/230741698-580cb151-e4ab-4a45-91c5-e6b2281b27c0.png">

<img width="960" alt="2023-04-08 (27)" src="https://user-images.githubusercontent.com/107764065/230741722-a1f3b1d9-5fcb-4b81-923a-90e892a8e880.png">

<img width="960" alt="2023-04-08 (28)" src="https://user-images.githubusercontent.com/107764065/230741749-84d81935-ed3b-4d3e-a352-f35a0b55baa4.png">

<img width="960" alt="2023-04-08 (30)" src="https://user-images.githubusercontent.com/107764065/230741811-a6886df5-f413-4482-8321-0e903c212bcd.png">

<img width="960" alt="2023-04-08 (29)" src="https://user-images.githubusercontent.com/107764065/230741786-f48d5f21-f7c5-4cc5-9d10-2275720f4087.png">

<img width="960" alt="2023-04-08 (31)" src="https://user-images.githubusercontent.com/107764065/230741846-b31ee420-799f-494b-9a1c-1fe6f8875822.png">

<img width="960" alt="2023-04-08 (32)" src="https://user-images.githubusercontent.com/107764065/230741876-f598efc3-9e1a-4f59-be02-14105e913e2c.png">


