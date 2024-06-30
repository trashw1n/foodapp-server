const pool = require('../db/db');

const placeOrder = async (req, res) => {
    const {table_num, items} = req.body;
    try{
        for(item_id of items){
            await pool.query(
                'INSERT INTO orders VALUES($1, $2)',
                [parseInt(table_num), item_id]
            );
        }
        res.status(200).json({"msg": "success"});
    } catch(err){
        res.status(500).json({"msg": "unsuccessful: " + err.stack});
    }
}

const getOrders = async (req, res) => {
    try{
        /*const tables = pool.query('SELECT DISTINCT table_num FROM orders')
            .then(result => result.rows)
            .then(rows => rows.map(row => row.table_num))
            .catch(err =>{
                res.status(500).json({"msg": "unsuccessful"});
            });
        const orders = {};
        tables.forEach(table_num => {
            const item_ids = pool.query(
                'SELECT item_id FROM orders WHERE table_num = $1',
                [table_num]
            ).then(result => result.rows);
            item_ids.forEach(item_id => {
                const items = pool.query(
                    'SELECT item, cost FROM menu WHERE id = $1',
                    [item_id]
                ).then(result => result.rows);
            });
            orders.table_num = items;
        });*/
        const orders = await pool.query(
            'SELECT orders.table_num, menu.item, menu.cost FROM orders INNER JOIN menu ON orders.item_id = menu.id'
        ).then(result => result.rows);
        const result = {};
        orders.forEach(order => {
            if(result[order.table_num] === undefined) result[order.table_num] = [];
            result[order.table_num].push({item: order.item, cost: order.cost});
        });
        res.status(200).json({"msg": "success", "orders": result});
    } catch(err){
        res.status(500).json({"msg": "some error occurred: " + err});
    }
}

const completeOrder = async (req, res) => {
    const {table_num} = req.query;
    try {
        await pool.query(
            'DELETE FROM orders WHERE table_num = $1',
            [parseInt(table_num)]
        );
        res.status(200).json({"msg": "successful"});
    } catch (err) {
        res.status(500).json({"msg": "unsuccessfull"});
    }
}

module.exports = {
    placeOrder, 
    getOrders,
    completeOrder
}