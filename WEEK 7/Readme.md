# Node.js Application

This Node.js application provides user authentication and management features using Express.js for the server, MongoDB for the database, and JWT for authentication. To get started, clone the repository using `git clone https://github.com/Vickym78/your-repo.git` and navigate to the project directory with `cd your-repo`. Install the dependencies by running `npm install`. 

Create a `.env` file in the root directory and add the environment variables: `PORT=your_port_number`, `mongodb_url=your_mongodb_connection_string`, and `Secret=your_jwt_secret_key`. To start the server, run `npm start`, and it will start on the port specified in the `.env` file. 

The application has several user routes. The **Signup** route (`POST /signup`) requires a request body with `name`, `email`, `password`, and `confirm_password`, and it responds with user details or an error message. The **Signin** route (`POST /signin`) requires `email` and `password` in the request body and responds with user details and a token or an error message. The **Get User** route (`GET /user`) requires authentication and responds with user details or an error message. The **Logout** route (`GET /logout`) also requires authentication and responds with a success message.

The database connection is handled using Mongoose, with the connection string stored in the `.env` file. The connection is established with `mongoose.connect(process.env.mongodb_url)`, and a message "Connected to the database" is logged once the connection is open. Middleware includes **Cookie Parser** to parse cookies attached to the client request object, and **JWT Authentication** to verify the JWT token and attach user info to the request object. 

To test the endpoints, tools like Postman or cURL can be used. Send a `POST` request to `/signup` with the required fields for signup, a `POST` request to `/signin` with email and password for signin, a `GET` request to `/user` with a valid JWT token to get user details, and a `GET` request to `/logout` to clear the token and log out.

Feel free to modify this README file to fit your specific project needs.
