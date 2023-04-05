const jwt = require('jsonwebtoken');


const decodeUser = (req, res) => {
    const { token } = req.headers;
    try {
        var decoded = jwt.verify(token, process.env.JWTSecret);
        return decoded.data;
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = decodeUser;