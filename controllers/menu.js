const pool = require('../db/db');

const menu = async (req, res) => {
    const {category} = req.query;
    const sql_query = (category === 'all')?
        'SELECT * FROM menu' : `SELECT * FROM menu WHERE category='${category}'`
    try{
        const items = await pool.query(sql_query);
        return res.status(200).json({"items": items.rows});
    } catch(err){
        console.log("error executing query: ", err.stack);
        return res.status(500).json({"msg": "error"});
    } 
}

module.exports = menu;