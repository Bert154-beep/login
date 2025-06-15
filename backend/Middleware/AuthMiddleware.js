const jwt = require('jsonwebtoken')

const AuthMiddleware = async (req, res, next) => {
    try {
        const AuthHeader = req.headers['authorization']

        if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
            return res.json({
                error:"Unauthorized!"
            });
        }
        const token = AuthHeader && AuthHeader.split(' ')[1];

        if(!token){
            return res.json({
                error: "Token Not Found!"
            })
        }

      

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (error) {
        console.log("An error Occured!", error)
    }
}

module.exports = { AuthMiddleware }