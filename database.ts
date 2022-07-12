import mongoose from "mongoose";
mongoose.connect("mongodb://0.0.0.0:27017/OTP", () => {
    console.log("database connected")
})
