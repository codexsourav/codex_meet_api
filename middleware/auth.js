import { get } from 'mongoose';
import userdb from '../model/userMoadels.js';

import jwt from 'jsonwebtoken';
export default async (req, res, next) => {
    try {
        let token;
        const cookietoken = req.cookies['user'];
        const headerToken = req.headers.authorization;
        if (headerToken) {
            token = headerToken.split(" ")[1];
        } else if (cookietoken) {
            token = cookietoken;
        } else {
            return res.status(401).send({ "error": "You Are Not Authorized", "auth": false });
        }

        if (!token) {
            return res.status(401).send({ "error": "You Are Not Authorized", "auth": false });
        }
        const user = jwt.verify(token, process.env.JWTKEY || "123");

        const getUser = await userdb.findOne({
            "$or": [{ "_id": user.id, }, { "email": user.email },]
        }, { "pass": 0, "token": 0, "verify": 0 });
        if (!getUser) {
            return res.status(401).send({ "error": "You Are Not Authorized", "auth": false });
        }

        req.authUser = getUser;
        next();

    } catch (error) {
        console.log({
            "Error": "Unauthorized User Request",
            "message": error.name,
            "stack": error,
        });
        return res.status(401).send({ "error": "You Are Not Authorized", "auth": false });

    }
}