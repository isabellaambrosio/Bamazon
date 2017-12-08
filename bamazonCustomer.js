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
    showList();

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
}


//show List of products
function showList() {
    console.log("");
    console.log("Products for Sale");
    console.log("______________________________________");
    console.log("");
    //read all from products
    connection.query("SELECT * FROM products", function(err, res) {
        //loop through each row and console log each item
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n Name: " + res[i].product_name + "\n Department: " + res[i].department_name + "\n Price: $" + res[i].price + "\n Stock Avaiability: " + res[i].stock_quantity + "\n");
        };
        console.log("______________________________________");
        console.log("");
    });
    //run user input function after setTimeOut
    setTimeout(function() {
        userInput();
    }, 500);
} //end of showList function


//take user's input
function userInput() {

    //inquirer for input
    console.log("");
    console.log("Choose an item and enter its information");
    console.log("");
    inquirer
        .prompt([{
                //getting ID input
                name: "id",
                type: "input",
                message: "Itme's ID",
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
                message: "How many units of this item would you like to buy today?",
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

                        //checking to see if stock quantity is greater than the input quantity
                        if (chosenItem.stock_quantity >= answer.quantity) {
                            console.log("");
                            console.log("______________________________________________");
                            console.log("");
                            console.log("Your item is available!!");
                            console.log("______________________________________________");
                            console.log("");

                            //setting new quantity based on previous quantity minus input quantity
                            var newQuantity = chosenItem.stock_quantity - answer.quantity;
                            //creating total price variable
                            var totalPrice = answer.quantity * chosenItem.price;

                            //updating new quantity
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                        stock_quantity: newQuantity
                                    },
                                    {
                                        item_id: chosenItem.item_id
                                    }
                                ],
                                //console.log results
                                function(error) {
                                    if (error) throw err;
                                    console.log("Stock quantity: " + chosenItem.stock_quantity);
                                    console.log("");
                                    console.log("Availability was successfully updated. New stock quantity: " + newQuantity);
                                    console.log("");
                                    console.log("______________________________________________");
                                    console.log("");
                                    console.log("Thank you for shopping with us today! Your total payment is: $" + totalPrice + ",00");
                                    console.log("______________________________________________");
                                    console.log("");
                                    setTimeout(function() {
                                        showList();
                                    }, 5000);
                                }
                            );
                        }
                        else {
                            console.log("");
                            console.log("______________________________________________");
                            console.log("");
                            console.log("Sorry, insufficient quantity!");
                            console.log("______________________________________________");
                            console.log("");
                        }
                    }
                };

            });

        })

} //end of userInput function


//=============================================================
// //option to purchase again
// purchaseAgain();

// //function to purchase again
// function purchaseAgain() {

//     //inquirer for input
//     console.log("Would you like to do another purchase?");
//     inquirer
//         .prompt([{
//             name: "purchaseAgain",
//             type: "list",
//             message: "Would you like to do another purchase?",
//             choices: ["YES", "NO"]
//         }]).then(function(answer) {
//             //if input is yes, call showList function
//             if (answer.purchaseAgain === "YES") {
//                 showList();
//             }
//             else {
//                 //if not, quit
//                 console.log("Alright, come back soon!")
//             }
//         }); //end of prompt questions

// }
//=============================================================
