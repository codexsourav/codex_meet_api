import userDb from '../model/userMoadels.js'
import bcrypt from 'bcryptjs';
import makejwt from '../utils/makeJwtToken.js'
import { validateEmail } from '../utils/ValidEmail.js'
import meetDb from '../model/meetMoadels.js'
import sendMail from '../mail/SendNewMail.js'
import { newAcountMail, resetPassMail, SuccessfullyChangePasswordMail, successfullyEmailVerified } from '../mail/MailTempaltes.js'
import createToken from "random-token";
import fetcherTime, { isDateUpToCurrent } from '../utils/futcherTime.js';
import HashPass from '../utils/HashPass.js';



export const login = async (req, res) => {
    const { email, pass } = req.body;
    // check is email or pass is exist
    if (!email || !pass) {
        return res.status(200).send({ "error": "Please Enter Email or Password" })
    }

    try {
        const userData = await userDb.findOne({ email }, { email: 1, pass: 1 });
        if (!userData) {
            return res.status(200).send({ "error": "Invalid Email ID or Password" });
        } else {
            // check password
            if (!bcrypt.compareSync(pass, userData.pass)) {
                res.send({ "error": "Invalid Email or Password" });
                return false;
            }
            // here set a jwt token for verify user 
            var token = makejwt(res, { "id": userData._id, "email": email });
            var userResData = await userDb.findByIdAndUpdate({ _id: userData._id }, { token }, { projection: { pass: 0, token: 0, verify: 0 } });
            var getMeets = await meetDb.find({ "creatorId": userData['_id'] });
            return res.status(202).send({ "success": true, "token": token, "data": { "profile": userResData, "meets": getMeets } });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": "Something Want Wrong", "message": error.toString() })
    }
}



export const signup = async (req, res) => {
    const { name, email, pass } = req.body;
    // check is email or pass is exist
    if (!email || !pass, !name) {
        return res.status(200).send({ "error": "Please Enter Your Name Email or Password" });
    } else if (!validateEmail(email)) {
        return res.status(200).send({ "error": "Invalid Email ID" });
    } else if (pass.length <= 5) {
        return res.status(200).send({ "error": "Your Password is Too Short" });
    }

    try {
        const checkEmailUserData = await userDb.findOne({ email });

        if (checkEmailUserData) {
            return res.status(200).send({ "error": "Email ID is Already Exist" });
        } else {

            var token = makejwt(res, { "email": email });
            var verifyToken = createToken(80);
            var addNewUser = new userDb({ name, email, pass, token, verify: { token: verifyToken } });

            try {
                var saveData = await addNewUser.save();
                await sendMail(email, "Welcome to Codex Meet", newAcountMail(name, process.env.APP_URI + "/verify-email/" + verifyToken));
                return res.status(202).send({ "success": true, "token": token, "data": { "profile": { "_id": saveData['_id'], name, email, token, isEmailVerify: false, date: saveData['date'] }, "meets": [] }, });
            } catch (error) {
                console.log(error);
                res.status(500).send({ "error": "Something Want Wrong", "message": error.toString() });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": "Something Want Wrong", "message": error.toString() })
    }
}


export const verify = async (req, res) => {
    try {
        const token = req.params.token;
        var user = await userDb.findOne({ "verify.token": token });
        if (!user) {
            return res.send({ "error": "Token Expired", "isEmailVerify": false });
        } else if (user.isEmailVerify == true) {
            return res.send({ "message": "Email Already Verified", "isEmailVerify": user.isEmailVerify });
        } else {
            // successfullyEmailVerified

            var response = await userDb.findOneAndUpdate({ "verify.token": token }, { $set: { "isEmailVerify": true, verify: { token: "" } } }, { projection: { pass: 0, token: 0, verify: 0 }, new: true },)
            await sendMail(user.email, "Your Email Successfully Verified", successfullyEmailVerified(user.name));
            return res.send({ "message": "Your Email Successfully Verified", "isEmailVerify": true, response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "error": "Unknown Server Error", "isEmailVerify": false });
    }
}



export const resetPass = async (req, res) => {
    try {
        const email = req.params.email;
        var user = await userDb.findOne({ email });
        if (!user) {
            return res.send({ "error": "User Not Found This Email", "status": false });
        } else {
            var passwordtoken = createToken(80);

            var response = await userDb.updateOne({ "email": email }, { $set: { "isEmailVerify": true, verify: { passwordtoken, date: fetcherTime(30) } } }, { projection: { pass: 0, token: 0, verify: 0 }, new: true },)
            await sendMail(email, "Reset Password", resetPassMail(user['name'], process.env.APP_URI + "/reset-password/" + passwordtoken));
            return res.send({ "status": true, "message": "Email Send Successfully. Check Your Inbox", response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "error": "Unknown Server Error", "status": false });
    }
}



export const resetPassChange = async (req, res) => {
    try {
        const token = req.params.token;
        const { pass } = req.body;
        var user = await userDb.findOne({ "verify.passwordtoken": token });

        if (!user) {
            return res.send({ "error": "Invalid! Link is Expired", "status": false });
        } if (!pass) {
            return res.send({ "error": "Please Enter Your Password", "status": false });
        } else if (pass.length <= 5) {
            return res.status(200).send({ "error": "Your Password is Too Short", "status": false });
        } else if (isDateUpToCurrent(user.verify.date)) {
            return res.send({ "error": "Invalid! Link is Expired", "status": false });
        } else {
            var newhashpass = HashPass(pass);
            var response = await userDb.updateOne({ "email": user.email }, { $set: { "isEmailVerify": true, "pass": newhashpass, verify: { "verify.passwordtoken": "", "verify.date": Date.now() } } }, { projection: { pass: 0, token: 0, verify: 0 }, new: true },)
            await sendMail(user.email, "Successfully Reset Password", SuccessfullyChangePasswordMail(user['name']));
            return res.send({ "status": true, "message": "Password Update Successfully", response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "error": "Unknown Server Error", "status": false });
    }
}


export const getProfile = async (req, res) => {
    try {
        var myMeet = await meetDb.find({ "creatorId": req.authUser["_id"] });
        return res.send({ "profile": req.authUser, "meets": myMeet });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ "error": "Unknown Server Error", "isEmailVerify": false });
    }
}