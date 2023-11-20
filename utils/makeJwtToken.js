import jwt from 'jsonwebtoken';
export default (res, signWith) => {
    var token = jwt.sign(signWith, process.env.JWTKEY || "123");
    res.cookie("user", token, {
        expires: new Date(Date.now() + 90 * 24 * 3600000),
        // cookie for 90 days
    });
    return token;
}