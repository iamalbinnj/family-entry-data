import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    unit: {
        type: String,
        required: true
    },
    houseN: {
        type: String,
        required: true
    },
    phoneN: {
        type: Number,
        required: true
    },
    memberDetails: [{
        name:String,
        relation:String,
        age:Number,
        bDate:Date,
        dob:Date,
        abroad:Boolean,
        placeName:String,
        married:Boolean,
        dom:Date,
        partnerName:String
    }]
})

export default mongoose.model("User", UserSchema)