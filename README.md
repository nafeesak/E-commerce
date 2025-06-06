# E-commerce

Backend

express: Web framework
mysql2: MySql client library
sequelize: ORM for MySql
dotenv: to load envirnoment variable from .env file
bcryptis: for password hashing
jsonwebtoken: for creating and verifying JWTs
multer: for handling multipart/form data(file uploads)
morgan: for logging HTTP request// developement
cors:for cross-origin requests from frontend
express-async-handler:This simplifies error handling in async Express route.
nodemon: (Dev dependency)Automarically restart the server on file changes
-----------------------------------------------------------------
FrontEnd
react-router-dom:For client-side routing
@redux.toolkit: The offical opinionated,batteries included toolset for effienct redux development
react-redux: Offical React binding for Redux.
axios: Promise-based HTTP client for making API request
-------------------------------------------------------------------------
	Test with Postman/Insomnia:
o	GET http://localhost:5000/api/products (Should return an empty array initially)
o	POST http://localhost:5000/api/users/register (Register a new user) 
	Body (JSON): { "name": "Test User", "email": "test@example.com", "password": "password123" }
o	POST http://localhost:5000/api/users/login 
	Body (JSON): { "email": "test@example.com", "password": "password123" }
	Copy the token from the response.
o	GET http://localhost:5000/api/users/profile 
	Headers: Authorization: Bearer <your_token_here>
o	To test product creation by an admin: 
	In your MySQL database, manually update isAdmin to 1 for your test@example.com user in the users table.
	POST http://localhost:5000/api/products (Use the admin user's token) 
	Headers: Authorization: Bearer <admin_token>
	Body (JSON): { "name": "Gaming Mouse", "price": 49.99, "description": "High precision gaming mouse", "image": "/images/mouse.jpg", "brand": "Logitech", "category": "Electronics", "countInStock": 10 }
----------------------------------------------------------------------------------


