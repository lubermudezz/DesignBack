# Time Tracking Application

- Application for time reporting. Users are able to report how much time they spent working on a task.

## Available Scripts

In the project directory, you can run:

### `npm start`

(runs nodemon)

## Dependencies:

- You should run npm install to use the application, you should install:
  - express
  - sequelize
  - nodemon
  - morgan
  - dotenv
  - cors

## Get Started:

- Create a Database (name: timetracking)
- Change project_id at task.json (it must be an existing id, you should use an id from the table Projects)
- Create a file named .env at directory (it should have your postgres credentials, DB_USER, DB_PASSWORD, DB_HOST) to connect your database

PD: All tables (Projects include) should create when you run npm start.


- You can login with a username. 
  - 'user 1' will let you use the application as a common user. 
  - 'admin' will let you use the application as an admin. You'll be able to approve the user entries.


### Next Steps:

- CRUD (task, entries and projects)
- Show total hours spent on a task.
- Admin shouldn't be able to approve his own input (as entry).
- Local and third party authentication
- Admin and user profiles
- Testing
- Deploy
