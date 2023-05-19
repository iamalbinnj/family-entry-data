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
        name: String,
        relation: String,
        age: Number,
        bDate: Date,
        dob: Date,
        birthdate:Number,
        birthmonth:String,
        birthyear:Number,
        baptismdate:Number,
        baptismmonth:Number,
        baptismyear:Number,
        abroad: Boolean,
        placeName: String,
        married: Boolean,
        dom: Date,
        marriagedate:Number,
        marriagemonth:Number,
        marriageyear:Number,
        partnerName: String,
        anniversary:Number
    }]
})

export default mongoose.model("User", UserSchema)