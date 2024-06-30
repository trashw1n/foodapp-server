const jwt = require("jsonwebtoken");

const staffAuth = async(req, res, next) =>{
    const token = req.cookies.token;
    console.log(`staff request received with token: ${token}`);
    if(!token){
        return res.status(401).json("not authorized to access this route");
    } 
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_S);
        const {name, id} = decoded;
        req.user = {name, id};
        next();
    } catch(err){
        return res.status(401).json("not authorized to access this route");
    }
}

module.exports = staffAuth;
