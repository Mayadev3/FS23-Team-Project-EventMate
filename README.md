## EventMate

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
