import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    username: {type:String, required: true},
    password: {type:String, required: true},
    userID:{ type:String,
        required: true
    },
    signUpDate: {
        date: Date,
        default: Date.now
    },
    firstName: String,
    lastName:String,
    friends: [String],
    createdPlans: [String],
    invitedPlans: [String]

})

const Account = mongoose.model('Account', accountSchema);
export default Account;