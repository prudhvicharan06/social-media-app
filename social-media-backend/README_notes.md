# Backend Code Explanation (Line-by-Line)

## Code Flow (How a request is handled)

1. **Client sends a request** (e.g., register, login, create post) to the backend API endpoint.
2. **Express receives the request** in `index.js`.
3. **Middleware runs** (e.g., `express.json()` parses JSON, `cors()` enables CORS).
4. **Route is matched** (e.g., `/api/auth/register`, `/api/auth/login`, `/api/posts`).
5. **Controller function is called** for that route (e.g., `registerUser`, `loginUser`).
6. **Controller interacts with the database** using Mongoose models (e.g., `User`, `Post`).
7. **If route is protected**, `authMiddleware` checks for a valid JWT token before allowing access.
8. **Controller sends a response** (success or error) back to the client.
9. **Client receives the response** and updates the UI accordingly.


## index.js

- `import dotenv from 'dotenv';` – Loads environment variables from `.env` file.
- `dotenv.config();` – Activates dotenv so you can use `process.env`.
- `import express from 'express';` – Imports Express framework.
- `import mongoose from 'mongoose';` – Imports Mongoose for MongoDB.
- `import cors from 'cors';` – Imports CORS middleware to allow cross-origin requests.
- `import authRoutes from './routes/auth.js';` – Imports authentication routes.
- `import postRoutes from './routes/postRoutes.js';` – Imports post routes.
- `const app = express();` – Initializes the Express app.
- `app.use(cors());` – Enables CORS for all routes.
- `app.use(express.json());` – Parses incoming JSON requests.
- `app.get('/', (req, res) => { res.send('API is running'); });` – Test route to check if server is running.
- `app.use('/api/auth', authRoutes);` – Mounts authentication routes at `/api/auth`.
- `app.use('/api/posts', postRoutes);` – Mounts post routes at `/api/posts`.
- `mongoose.connect(process.env.MONGO_URI)...` – Connects to MongoDB using the URI from `.env`.
- `const PORT = process.env.PORT || 5000;` – Sets the server port.
- `app.listen(PORT, ...);` – Starts the server.

## models/User.js

- `import mongoose from 'mongoose';` – Imports Mongoose.
- `const userSchema = new mongoose.Schema({...}, { timestamps: true });` – Defines the user schema with fields and timestamps.
- `export default mongoose.model('User', userSchema);` – Exports the User model.

## models/Post.js

- `import mongoose from 'mongoose';` – Imports Mongoose.
- `const postSchema = new mongoose.Schema({...}, { timestamps: true });` – Defines the post schema.
- `export default mongoose.model('Post', postSchema);` – Exports the Post model.

## middleware/auth.js

- `import dotenv from 'dotenv'; dotenv.config();` – Loads environment variables.
- `import jwt from 'jsonwebtoken';` – Imports JWT library.
- `export default function authMiddleware(req, res, next) {...}` – Middleware to protect routes.
- `const authHeader = req.headers.authorization;` – Gets the Authorization header.
- `if (!authHeader || !authHeader.startsWith('Bearer ')) ...` – Checks for token presence and format.
- `const token = authHeader.split(' ')[1];` – Extracts the token.
- `const decoded = jwt.verify(token, process.env.JWT_SECRET);` – Verifies the token.
- `req.user = decoded;` – Attaches decoded user info to the request.
- `next();` – Proceeds to the next middleware/route.

## controllers/authController.js

- `import bcrypt from 'bcryptjs';` – Imports bcrypt for password hashing.
- `import jwt from 'jsonwebtoken';` – Imports JWT for token creation.
- `import User from '../models/User.js';` – Imports User model.
- `import dotenv from 'dotenv'; dotenv.config();` – Loads environment variables.
- `const JWT_SECRET = process.env.JWT_SECRET;` – Gets JWT secret from env.
- `export const registerUser = async (req, res) => {...}` – Handles user registration.
  - Extracts name, email, password from request.
  - Checks if user exists.
  - Hashes password.
  - Creates and saves new user.
  - Responds with success or error.
- `export const loginUser = async (req, res) => {...}` – Handles user login.
  - Extracts email, password from request.
  - Finds user by email.
  - Compares password with hash.
  - Creates JWT token with userId.
  - Responds with token and user info or error.

## routes/auth.js

- Defines routes for registration and login, using the controller functions.

**What is a controller function?**
- A controller function is a function that contains the logic for handling a specific route's request and response. It separates business logic from route definitions, making code modular and easier to maintain. For example, `registerUser` and `loginUser` are controller functions that handle user registration and login.

## routes/postRoutes.js

- `import express from 'express';` – Imports Express.
- `const router = express.Router();` – Creates a router instance.
- `import Post from '../models/Post.js';` – Imports Post model.
- `import authMiddleware from '../middleware/auth.js';` – Imports auth middleware.
- `router.post('/', authMiddleware, async (req, res) => {...})` – Protected route to create a post.
- `router.get('/', async (req, res) => {...})` – Public route to get all posts.
- `export default router;` – Exports the router.


---

## FAQ & Concepts

**Q: What is an API endpoint?**
- An API endpoint is a specific URL path on your backend server that handles a particular request (e.g., `/api/auth/login`). It's where the client (frontend or another service) sends HTTP requests to interact with your backend (get data, create users, etc).

**Q: What is localhost? Is it on my PC? How can many people use the same localhost:5000?**
- `localhost` refers to your own computer (the local machine). When you use `http://localhost:5000`, it means your server is running on your PC and is only accessible from your PC (unless you configure it for external access). If someone else uses `localhost:5000` on their computer, it refers to their own machine, not yours. So, many people can use the same port number on their own computers without conflict.

**Q: Where is my MongoDB data stored? (MongoDB Atlas vs. Local MongoDB)**
- If your `MONGO_URI` starts with `mongodb+srv://...`, you are using MongoDB Atlas (cloud database). Your data is stored in the cloud, not on your local machine. MongoDB Compass is just a GUI tool to view/manage your cloud (or local) database. If you use a URI like `mongodb://localhost:27017/...`, your data is stored locally on your PC.

**Behind the scenes:**
- When you register or create a post, your backend receives the data and saves it to the MongoDB database specified by your `MONGO_URI`. If it's Atlas, the data is stored in the cloud and you can view it with MongoDB Compass by connecting to your cluster.

**Q: What are the main methods and powers of JWT (jsonwebtoken library)?**
- `jwt.sign(payload, secret, options)`: Creates (signs) a new JWT token with the given payload and secret. Used for generating tokens after login or registration.
- `jwt.verify(token, secret, options)`: Verifies a JWT token's signature and decodes its payload. Used in middleware to check if a token is valid.
- `jwt.decode(token, options)`: Decodes a JWT token without verifying its signature (not secure for authentication, but useful for reading payload data).

**Powers of JWT:**
- Securely transmits information between client and server as a JSON object.
- Can be used for authentication (proving identity) and authorization (access control).
- Self-contained: the payload can include user info, roles, and permissions.
- Stateless: the server does not need to store session data; all info is in the token.
- Can set expiration (`exp`), issuer (`iss`), audience (`aud`), and other claims in the token.

**Q: What is payload?**
- The payload in a JWT (JSON Web Token) is the part of the token that contains the actual data or claims you want to transmit. For example, when you create a token with `jwt.sign({ userId: user._id }, secret)`, the object `{ userId: user._id }` is the payload. The payload can include user information, roles, permissions, or any other data you want to securely send between client and server. The payload is base64-encoded and can be read by anyone, but its integrity is protected by the token's signature.

---

**This file explains each backend file, line, the overall code flow, JWT methods, and answers common questions for quick recall. Update as your project grows!**

