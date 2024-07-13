const jwt = require("jsonwebtoken");

const userAuth = async(req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({msg: 'Authentication invalid'});
    }
    const token = authHeader.split(' ')[1];
    console.log(`user request received with token: ${token}`);
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_U);
        const {name, id} = decoded;
        next();
    } catch(err){
        return res.status(401).json({"msg":"not authorized to access this route"});
    }
}

module.exports = userAuth;