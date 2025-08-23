# MongoDB Basics for Node.js Projects

This guide covers the essential MongoDB concepts and code you need to build small to production-ready Node.js projects.

---

## 1. What is MongoDB?
- MongoDB is a NoSQL, document-oriented database. Data is stored in flexible, JSON-like documents (BSON).
- Collections are like tables in SQL, and documents are like rows.

---

## 2. Installing MongoDB (Local)
- Download from https://www.mongodb.com/try/download/community and follow the installation instructions for your OS.
- Start the MongoDB server with `mongod`.

---

## 3. MongoDB Atlas (Cloud)
- Go to https://www.mongodb.com/cloud/atlas and create a free cluster.
- Create a database user and get your connection string (URI).
- Example URI: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase`

---

## 4. Connecting to MongoDB in Node.js

### Install Mongoose
```sh
npm install mongoose
```

### Connect to MongoDB
```js
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
```
- `mongoose.connect(uri)` connects your app to the database.
- Use `process.env.MONGO_URI` for security (store your URI in a `.env` file).

---

## 5. Defining a Schema and Model
```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
```
- `mongoose.Schema` defines the structure of documents in a collection.
- `type` sets the data type, `required` makes the field mandatory, `unique` ensures no duplicates.
- `timestamps: true` automatically adds `createdAt` and `updatedAt` fields.
- `mongoose.model('User', userSchema)` creates a model for the `users` collection.

---

## 6. CRUD Operations

### Create
```js
const newUser = new User({ name, email, password });
await newUser.save();
```
- Creates and saves a new document.

### Read
```js
const user = await User.findOne({ email });
const users = await User.find();
```
- `findOne` gets a single document, `find` gets all documents.

### Update
```js
await User.updateOne({ email }, { $set: { name: 'New Name' } });
```
- Updates fields in matching documents.

### Delete
```js
await User.deleteOne({ email });
```
- Deletes a document.

---

## 7. Relationships (References)
```js
const postSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
```
- Use `ObjectId` and `ref` to relate documents (like foreign keys).
- Use `.populate('author')` to get full user data with a post.

---

## 8. Environment Variables
- Store sensitive info (like your MongoDB URI) in a `.env` file:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mydb
```
- Load with `dotenv`:
```js
import dotenv from 'dotenv';
dotenv.config();
```

---

## 9. Production Tips
- Never commit your `.env` file or credentials to version control.
- Use indexes for performance (`unique: true` creates an index).
- Use validation in schemas to enforce data integrity.
- Use try/catch and proper error handling for all DB operations.
- Use connection pooling (handled by Mongoose by default).
- Monitor your database with MongoDB Atlas or tools like Compass.

---

## 10. Useful Mongoose Methods
- `findById(id)` – Find by document ID.
- `findByIdAndUpdate(id, update)` – Update by ID.
- `findByIdAndDelete(id)` – Delete by ID.
- `countDocuments(query)` – Count matching documents.

---

## 11. Example: User Registration
```js
// In your controller
const hashedPassword = await bcrypt.hash(password, 10);
const newUser = new User({ name, email, password: hashedPassword });
await newUser.save();
```
- Always hash passwords before saving.

---

## 12. Resources
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**This file covers the basics you need to go from a small project to production with MongoDB and Node.js.**
