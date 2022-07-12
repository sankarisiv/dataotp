import { RequestHandler } from 'express'
import { generate } from './model'
import { infoModel } from './model'
import { tokeninfo } from './model'
import token from "jsonwebtoken"

export const otpGenerator: RequestHandler = async (req, res) => {
    const otp = Number(100000 + Math.random() * 900000)
    const otp1 = Math.floor(otp)
    var time = new Date();
    console.log(time)
    time.setMinutes(time.getMinutes() + 5);
    console.log(time)

    const obj = {
        phoneNumber: req.body.phoneNumber,
        otp: otp1,
        expiryTime: time
    }
    const data = new generate(obj)
    await data.save()
    res.send(data)
}
export const tokenGenerator: RequestHandler = async (req, res) => {
    var date = new Date()
    const found = await generate.findOne({ phoneNumber: req.params.phoneNumber, otp: req.body.otp })
    if (found) {
        var exptime: any = found.expiryTime
        if (date <= exptime) {
            let info = token.sign({ phoneNumber: req.params.phoneNumber }, 'siva');

            var time = new Date();
            console.log(time)
            time.setMinutes(time.getMinutes() + 3);
            console.log(time)

            const obj2 = {
                tokenData: info,
                exprTime: time
            }
            const data1 = new tokeninfo(obj2)
            await data1.save()
            res.send(info);

        } else {
            console.log("otp expired")
            res.send("otp expired")
        }
    } else {
        console.log("no data found")
        res.send("no data found")
    }
}
export const tokenDecode: RequestHandler = async (req, res) => {
    var tokenData: any = req.headers.authorization
    const found1 = await tokeninfo.findOne({ tokenData: tokenData })
    if (found1) {
        var time1 = new Date();
        var expryTime: any = found1.exprTime
        if (time1 <= expryTime) {
            if (tokenData) {
                var decoded: any = token.verify(tokenData, 'siva');
                let number = Number(decoded.phoneNumber)
                var obj1 = {
                    First_Name: req.body.First_Name,
                    Last_Name: req.body.Last_Name,
                    Address: req.body.Address,
                    phoneNumber: number
                }
                const datadecode = new infoModel(obj1)
                await datadecode.save()
                res.send(datadecode)
                console.log(datadecode)

            }

        } else {
            res.send("token expired")
        }
    }
}
