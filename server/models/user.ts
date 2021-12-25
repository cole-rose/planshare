import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: {type:String, required: false},
    password: {type:String, required: false},
    // userID:{ type:String,
    //     required: true
    // },
    // signUpDate: {
    //     date: Date,
    //     required:true
    // },
    firstName: String,
    lastName:String,
    friends: [String],
    createdPlans: [String],
    invitedPlans: [String]

})

const User = mongoose.model('users', accountSchema);
export default User;