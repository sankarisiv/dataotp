import mongoose from "mongoose";
const schema = new mongoose.Schema({
    phoneNumber: {
        type: Number
    },
    otp: {
        type: Number
    },
    expiryTime: {
        type: Date
    }
})
export const generate = mongoose.model("OTP", schema)

const tokenmodel = new mongoose.Schema({
    tokenData:{
        type:String
    },
    exprTime:{
        type:Date
    }

})
export const tokeninfo = mongoose.model("TOKEN",tokenmodel)

const dataModel = new mongoose.Schema
({
    First_Name:{
        type:String
    },
    Last_Name:{
        type:String
    },
    Address:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
})
export const infoModel= mongoose.model('PERSONAL_DATA',dataModel)

