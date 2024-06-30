const jwt = require("jsonwebtoken");
const pool = require('../db/db');

const register = async(req, res) =>{
    const {name, role, password} = req.body;
    console.log(`new registration request: username: ${name}, password: ${password}`);
    if(!name || !password){
        return res.status(400).json({msg: 'please provide a name and password'});
    }
    try{
      //ENTER USER DATA INTO DATABASE
      const user = await pool.query(
        "INSERT INTO users (name, role, password) VALUES($1, $2, $3)",
        [name, role, password]
      );
      return res.status(200).json({msg: "user created"});
    }
    catch(err){
      console.log(err);
      return res.status(500).json({msg:"unable to register"});
    }
}

const login = async (req, res) => {
    const {name, role, password} = req.body;
    const user = await pool.query(
      "SELECT * FROM users WHERE name = $1 AND role = $2",
      [name, role]
    );
    if(user.rows.length == 0){
      return res.status(401).json({msg: "user does not exist"});
    }
    const id = user.rows[0].id;
    const actualPassword = user.rows[0].password;
    // compare password
    if (password != actualPassword) {
      return res.status(401).json({status: "unsuccessful", msg:"invalid credentials"});
    }
    const JWT_SECRET = role === 'staff'? process.env.JWT_SECRET_S:process.env.JWT_SECRET_U;
    const token = jwt.sign({name, id}, JWT_SECRET);
    res.cookie('token', token, 
      {
        maxAge: 1000 * 60 * 60, 
        httpOnly: true, 
        sameSite: 'strict' 
      }
     );
    res.status(200).json({msg: "success"});
}

module.exports = {
    register, 
    login
} 