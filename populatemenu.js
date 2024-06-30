const pool = require('./db/db');

const items = [
    { item: "paneer tikka", category: "appetizers", cost: 50 },
    { item: "seekh kebab", category: "appetizers", cost: 50 },
    { item: "samosa", category: "appetizers", cost: 50 },
    { item: "tacos", category: "appetizers", cost: 50 },
    { item: "beer", category: "drinks", cost: 50 },
    { item: "orange juice", category: "drinks", cost: 50 },
    { item: "mojito", category: "drinks", cost: 50 },
    { item: "lassi", category: "drinks", cost: 50 },
    { item: "blueberry cheesecake", category: "desserts", cost: 50 },
    { item: "gulab jamun", category: "desserts", cost: 50 },
    { item: "ice cream", category: "desserts", cost: 50 },
    { item: "butter chicken", category: "main courses", cost: 50 },
    { item: "shahi paneer", category: "main courses", cost: 50 },
    { item: "chicken tikka masala", category: "main courses", cost: 50 },
    { item: "chicken biryani", category: "main courses", cost: 50 },
];

const insert_into_menu = async ({ item, category, cost }) => {
    await pool.query(
        "INSERT INTO menu (item, category, cost) VALUES ($1, $2, $3)",
        [item, category, cost]
    );
};

const populate = async () => {
    for (const element of items) {
        await insert_into_menu(element);
    }
    console.log('All items have been inserted');
};

populate().then(() => {
    pool.end(); 
});
