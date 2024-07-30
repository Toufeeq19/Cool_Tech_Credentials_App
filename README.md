# Cool Tech Application

## Description

Cool Tech is a web application designed to provide an intuitive interface for managing users with different roles (normal, admin, manager) and connecting to a Mongoose database.

## Installation

To install the project follow these steps:

1. **Download the Code:**
   Clone the repository or download the code to your local machine.

2. **Create an env file:**
   Please create a .env file in the server directory with the following variables: 
      DB_URI - please link your database with this variable 
      JWT_TOKEN - please create your own secret token

3. **Install Dependencies:**
   Navigate to both the server and client directories and run the following command:
   "npm install"

4. **Start the App:**
   To run the client input into your terminal "npm start".

   To run the Server input into your terminal "nodemon app.js".

   Client runs on [http://localhost:3000]

5. **Testing roles** 
   Test admin - email: admin@cooltech.com password: admin
   Test manager - email: rassieerasmus@cooltech.com password: bokke
   Test normal - toufeeqtoffar@cooltech.com password: touf
   
### Home Page

![Home Page](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/home%20page.png)

### Login Page

![Login Page](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/login%20page.png)

### Registration Page

![Registration Page](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/registration%20page.png)

### Successfully Registering

![Successfully Registering](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/successfully%20registering.png)

### Successfully Logged In

![Successfully Logged In](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/successfully%20logged%20in.png)

### Viewing Divisions

![Viewing Divisions](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/viewing%20divisions.png)

### Example Of Viewing All Accounts

![Example Of Viewing All Accounts](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/example%20of%20viewing%20all%20accounts%20if%20logged%20in%20as%20an%20admin.png)

### Adding New Credentials

![Adding New Credentials](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/adding%20new%20credentials%20-%20normal%20user.png)

### Access Denied To New Roles

![Access Denied To New Roles](https://github.com/Toufeeq19/Cool_Tech_Credentials_App/blob/main/screenshots/access%20denied%20to%20edit%20roles%20etc%20if%20not%20admin.png)
