const jwt = require("jsonwebtoken");

const secret = "mysecretshh";
const expiration = "2h";

module.exports = {
    signToken: function({  _id }) {
        const payload = { _id };
        return jwt.sign({ data: payload}, secret, { expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization
        // if the token is sent via headers, separate "Bearer" from "<tokenvalue>"
        if(req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }
        // if there's no token, return the object as is
        if(!token) {
            return req;
        }

        try {
            // decode and attach user data to request object
            // if jwt.verify secret doesn't match jwt.sign(), the object won't be decoded
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        };

        return req;
    }
};