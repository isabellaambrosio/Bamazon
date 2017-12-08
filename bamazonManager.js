var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the showList function after the connection is made to prompt the user
    // console.log("connected as id " + connection.threadId);
    start();
    managerPrompt();

});

//console log start app
function start() {
    console.log("");
    console.log("______________________________________");
    console.log("");
    console.log("Welcome to BAMAZON");
    console.log("");
    console.log("______________________________________");
    console.log("");
    console.log("Manager's view");
    console.log("");
    console.log("______________________________________");
    console.log("");
}

//prompt manager's input
function managerPrompt() {
    inquirer
        .prompt({
            name: "managerPrompt",
            type: "list",
            message: "What task would you like to execute today?",
            choices: ["Products for Sale", "Low Inventory", "Add to Inventory", "Add New Product"]
        })
        .then(function(answer) {
            // based on the answer, run the conditions
            if (answer.managerPrompt === "Products for Sale") {
                showList();
                //show prompt again for more options
                setTimeout(function() {
                    managerPrompt();
                }, 1000);

            }
            else if (answer.managerPrompt === "Low Inventory") {
                lowInventory();
                //show prompt again for more options
                setTimeout(function() {
                    managerPrompt();
                }, 1000);

            }
            else if (answer.managerPrompt === "Add to Inventory") {
                console.log("");
                console.log("______________________________________________");
                console.log("");
                console.log("Here is a list of items that are low on inventory that you might want to use.");
                console.log("______________________________________________");
                console.log("");
                //show low inventory list so manager can have easy access to them
                lowInventory();
                //then run add inventory
                setTimeout(function() {
                    addIventory();
                }, 1000);
            }
        });
} //end of managerPrompt function

//FUNCTIOS
//===============================================================================

//SHOW LIST
function showList() {
    console.log("");
    console.log("______________________________________________");
    console.log("");
    console.log("These are the products that are for sale");
    console.log("______________________________________________");
    console.log("");
    ////read all from products
    connection.query("SELECT * FROM products", function(err, res) {
        //loop through each row and console log each item
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n Name: " + res[i].product_name + "\n Department: " + res[i].department_name + "\n Price: $" + res[i].price + "\n Stock Avaiability: " + res[i].stock_quantity + "\n");
        };
        console.log("______________________________________________");
        console.log("");
    });
}

//LOW INVENTORY
function lowInventory() {
    ////read all from products
    connection.query("SELECT * FROM products", function(err, res) {
        //loop from all of them
        for (var i = 0; i < res.length; i++) {
            //console log items that have less than 5 items in stock
            if (res[i].stock_quantity < 5) {
                console.log("");
                console.log("______________________________________________");
                console.log("");
                console.log("Item ID: " + res[i].item_id + "\n Name: " + res[i].product_name + "\n Department: " + res[i].department_name + "\n Price: $" + res[i].price + "\n Stock Avaiability: " + res[i].stock_quantity + "\n");
                console.log("______________________________________________");
                console.log("");

            }
        };
    });
}

//ADD TO INVENTORY
function addIventory() {
    inquirer
        .prompt([{
                //getting ID input
                name: "id",
                type: "input",
                message: "What is the itme's ID that you would like to add to?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            { //getting quantity input
                name: "quantity",
                type: "input",
                message: "How many units would you like to add to the item's inventory?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]) //end of prompt questions

        .then(function(answer) {
            //selecting all from product and looping through them comparing the ids
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;

                for (var l = 0; l < results.length; l++) {
                    if (results[l].item_id === parseInt(answer.id)) {

                        //setting item based on the comparison between input id and result's id
                        var chosenItem = results[l];

                        //setting newQuantity based on stock_quantity minus input quantity
                        var newQuantity = chosenItem.stock_quantity + parseInt(answer.quantity);
                        console.log("");
                        console.log("Current quantity in stock: " + chosenItem.stock_quantity);
                        console.log("");
                        //updating table with newQuantity
                        connection.query("UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: newQuantity
                                },
                                {
                                    item_id: chosenItem.item_id
                                }
                            ],

                            function(error) {
                                if (error) throw err;
                                console.log("");
                                console.log("______________________________________________");
                                console.log("");
                                console.log("Quantity was successfully updated! New stock quantity: " + newQuantity);
                                console.log("______________________________________________");
                                console.log("");
                                //runs managerPrompt so user can start again
                                setTimeout(function() {
                                    managerPrompt();
                                }, 2000);
                            }
                        ); //end of update

                    } //end of if statement
                } //end of loop
            }); //end of first connection query

        }) //end of .then
} //end of addInventory function

//ADD NEW PRODUCT
function newProduct() {
    console.log("");
    console.log("______________________________________________");
    console.log("");
    console.log("Enter item's informations");
    console.log("______________________________________________");
    console.log("");
    // prompt for info about new item
    inquirer
        .prompt([{
                name: "product_name",
                type: "input",
                message: "What is the item's name that you would like to add?"
            },
            {
                name: "department_name",
                type: "input",
                message: "What department would you like to place your item in?"
            },
            {
                name: "price",
                type: "input",
                message: "What price would you like to set the new item for?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many units would you like to add to the stock?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query("INSERT INTO products SET ?", {
                    product_name: answer.product_name,
                    department_name: answer.department_name,
                    price: answer.price,
                    stock_quantity: answer.stock_quantity
                },
                function(err) {
                    if (err) throw err;
                    console.log("");
                    console.log("______________________________________________");
                    console.log("");
                    console.log("Your new item was successfully added!");
                    console.log("______________________________________________");
                    console.log("");
                    // re-prompt the user for new tasks
                    setTimeout(function() {
                        managerPrompt();
                    }, 2000);
                }
            );
        });
}
