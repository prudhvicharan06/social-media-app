# Social Media Backend

This is a Node.js backend for a social media application using Express, MongoDB (with Mongoose), and JWT authentication.

## Scripts

- **Start the server:**
  ```sh
  npm start
  # or
  node index.js
  ```
  Starts the server and listens for incoming requests.

- **Development mode (auto-restart on changes):**
  ```sh
  npm run dev
  ```
  Uses `nodemon` to automatically restart the server when files change.

## Dependencies

- **bcryptjs**: Library to hash passwords before storing them in the database.
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing) for allowing cross-origin requests.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for Node.js to create the server and handle requests.
- **jsonwebtoken**: Library to create and verify JSON Web Tokens (JWT) for authentication.
- **mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js. Used to connect to the database and perform CRUD operations with schema-based models.

## ES Modules

To use ES modules (import/export syntax):
- Add the following to your `package.json` at the top level:
  ```json
  "type": "module"
  ```
- Make sure all your import paths include `.js` (e.g., `import authRoutes from './routes/auth.js';`).

---

Feel free to update this README with more details about your API endpoints, environment variables, and usage instructions as your project grows.