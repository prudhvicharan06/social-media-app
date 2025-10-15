import dotenv from 'dotenv';
dotenv.config();
// dotenv.config() is used to load environment variables from a .env file into process.env.
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

import cors from 'cors';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/postRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.send('API is running');
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// Handle static files and React routing in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files
    app.use(express.static(path.join(__dirname, '../social-media-frontend/build')));
    
    // Handle all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../social-media-frontend/build/index.html'));
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// This is a simple Express server that connects to MongoDB and has authentication routes.
// It uses dotenv for environment variables, cors for cross-origin resource sharing, and mongoose for MongoDB object modeling.
// The authentication routes are imported from a separate file and used in the main server file.
// The server is set up to handle JSON requests and has CORS enabled for all origins.
// The MongoDB connection is established using the connection string stored in the environment variable MONGO_URI.
// The server is set to listen on a specified port, defaulting to 5000 if not provided in the environment variables.
// The server is configured to serve a React frontend app in production, by serving static files from the build directory and handling all other requests by sending back the index.html file.