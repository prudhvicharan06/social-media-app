import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    
},

{
    timestamps:true,
}

);

export default mongoose.model('User',userSchema);

//we can use this model to create, read, update and delete users in the database
//model methods are used to interact with the database
//first parameter is the name of the model
//second parameter is the schema(is a constructor)