import mongoose from 'mongoose';

const userSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already registered']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    resetPasswordLink: {
        type: String,
        default: ''
    }
}, {timestamps: true})

const User=mongoose.model('User', userSchema);

export default User;
