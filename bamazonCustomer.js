const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'central273',
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw (err);
    welcome(); //Display store items to user upon successful connection
})

function welcome() {
    connection.query("SELECT item_id, product_name, price FROM products", (err, resp) => {
        if (err) throw (err);
        for (var i = 0; i < resp.length; i++) {
            console.log(`
            Item Numer: ${resp[i].item_id}
            Product Name: ${resp[i].product_name}
            Price: ${resp[i].price}`);
        }
        consume();
    });
}

function consume() {
    inquirer.prompt([{
        name: 'itemFinder',
        type: 'input',
        message: 'What is the item number of the product you would like to buy?',
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: 'itemAmount',
        type: 'input',
        message: 'How many of this item do you plan on buying?',
        validate: function (value) {
            if (isNaN(value) === false) {
                return true
            }
            return false;
        }
    }])
        .then((answer) => {
            // Time to target the product and match it with customer input
            connection.query('SELECT * FROM products', (err, respon) => {
                if (err) throw (err);
                let itemConsumed;
                for (let i = 0; i < respon.length; i++) {
                    if (respon[i].item_id === parseInt(answer.itemFinder)) {
                        itemConsumed = respon[i]; //Helps target for future use
                    }
                }
                //Check if storefront has enough of the product
                //Conditional statement to check DB, and update it if user input is less than inventory
                if (itemConsumed.stock_quantity > parseInt(answer.itemAmount)) {
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            { //We want to implement the transaction
                                stock_quantity: (itemConsumed.stock_quantity - parseInt(answer.itemAmount))
                            },
                            {
                                item_id: itemConsumed.id
                            }
                        ],
                        (error) => {
                            if (error) throw (error);
                            console.log(`Transaction Approved. Total Cost = ${parseInt(answer.itemAmount) * itemConsumed.price}`);
                            console.log(`Product items left in stock: ${itemConsumed.product_name ,itemConsumed.stock_quantity}`)
                        });
                }
                else {
                    console.log(`Transaction Unapproved. Try to order a lower amount or check any other products.`);
                    welcome();
                }
            });
        });
};
