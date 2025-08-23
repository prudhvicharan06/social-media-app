import dotenv from 'dotenv';
dotenv.config();
// dotenv.config() is used to load environment variables from a .env file into process.env.
import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/postRoutes.js';



const app = express();
app.use(cors());
app.use(express.json());
//

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// This is a simple Express server that connects to MongoDB and has authentication routes.
// It uses dotenv for environment variables, cors for cross-origin resource sharing, and mongoose for MongoDB object modeling.
// The authentication routes are imported from a separate file and used in the main server file.
// The server is set up to handle JSON requests and has CORS enabled for all origins.
// The MongoDB connection is established using the connection string stored in the environment variable MONGO_URI.
// The server is set to listen on a specified port, defaulting to 5000 if not provided in the environment variables.