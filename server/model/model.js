const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, trim: true, required: true, minlength: 3, maxlength: 15}, 
    email: {type: String, trim: true, required: true, unique: true, lowercase: true},
    password:{type: String, required: true, minlength: 6} 
}, {timestamps: true})

const todoSchema = new mongoose.Schema({
    title:{type: String, trim: true, required: true, maxlength: 50},
    description:{type: String, trim: true, required: true, maxlength: 500},
    completed:{type: Boolean, default: false},
    priority:{type: String, enum: ['Low', 'Medium', 'High'], default:'Medium'},
    dueDate:{type: Date, required: true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { User, Todo };