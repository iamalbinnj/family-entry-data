import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        // mongodb connection
        const connection=await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB