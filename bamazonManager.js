const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk")
const log = console.log
let cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "bamazon_db",
    insecureAuth: true
});

connection.connect(function (err) {
    if (err) throw err;
    log(`connected. ID: ${connection.threadId}`)
    managerSelection();
});

function newSelection() {
    inquirer.prompt({

        type: "confirm",
        message: "Would you like to make a different selection?",
        name: "newChoice"

    }).then(function (answer2) {

        if (answer2.newChoice) {

            managerSelection();
        }
    })
}

function managerSelection() {
    inquirer.prompt([{
            type: "list",
            message: "Welcome Manager, What do you wish to do today?",
            name: "selection",
            choices: ["View Products for Sale", "View Low Inventory", "Add New Product", "Add to Inventory"]
        }

    ]).then(function (answer) {
        log(answer.selection)
        if (answer.selection === "View Products for Sale") {
            connection.query(
                "SELECT * FROM products",
                function (err, data) {
                    if (err) throw err;
                    log("\n")
                    console.table(data)
                    newSelection()
                }
            )
        } else if (answer.selection === "View Low Inventory") {
            connection.query(
                "SELECT * FROM products WHERE stock_quantity <= 10",
                function (err, data) {
                    if (err) throw err;
                    log("\n")
                    console.table(data)
                    newSelection()
                }
            )
        } else if (answer.selection === "Add New Product") {
            inquirer.prompt([{
                    type: "input",
                    message: "Enter the name of the product",
                    name: "newProduct"
                },
                {
                    type: "input",
                    message: "Enter the department of the new product",
                    name: "newDepartment"
                },
                {
                    type: "input",
                    message: "Enter the price of the new product",
                    name: "newPrice"
                },
                {
                    type: "input",
                    message: "Enter the Stock Quantity of the new product",
                    name: "newStock"
                }
            ]).then(function (answer3) {
                if (isNaN(answer3.newProduct)) {
                    log(answer3)
                    connection.query(
                        "INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (?, ?, ?, ?)",

                        [
                            answer3.newProduct,
                            answer3.newDepartment,
                            parseFloat(answer3.newPrice),
                            parseInt(answer3.newStock)
                        ],
                        function (err) {
                            if (err) throw err;
                            log("Entered")
                            newSelection()
                        }

                    )
                }
            })

        } else if (answer.selection === "Add to Inventory") {

            connection.query("SELECT * FROM products", function (err, data) {

                inquirer.prompt([{
                        type: "input",
                        name: "selectID",
                        message: "Enter the Item ID"
                    },
                    {
                        type: "input",
                        name: "quantity",
                        message: "Amount to add?"

                    }
                ]).then(function (answer4) {
                    let arr;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].item_id === parseInt(answer4.selectID)) {
                            arr = data[i]
                        }
                    }
                    //  arr.stock_quantity <= parseInt(answer4.quantity) ||  arr.stock_quantity >= parseInt(answer4.quantity) 
                    if (arr.stock_quantity <= parseInt(answer4.quantity) ||  arr.stock_quantity >= parseInt(answer4.quantity)) {
                    // if (parseInt(answer4.quantity) <= arr.stock_quantity || parseInt(answer4.quantity) >= arr.stock_quantity) {
                     let newstock = arr.stock_quantity + parseInt(answer4.quantity)
                         log(arr.stock_quantity)
                         log(answer4.quantity)
                        log(newstock)
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: newstock
                                },
                                {
                                    item_id: answer4.selectID
                                }
                            ],
                            function (err,data) {

                                if (err) throw err;
                                log(data)
                                log("did it wrks?")
                                newSelection()
                            }
                        )
                    }
                })






            })





        }
        // inquirer.prompt({

        //     type: "confirm",
        //     message: "Would you like to make a different selection?",
        //     name: "newChoice"

        // }).then(function (answer2) {

        //     if (answer2.newChoice) {

        //         managerSelection();
        //     }
        // })
    })
    // connection.query
    // ("SELECT * FROM products", function(err,data){
    //     if(err) throw err;
    //     // for(let i =  0; i < data.length; i++){
    //     //     log(
    //     //         "ID" + data[i].item_id, 
    //     //          "Product" + data[i].product_name,
    //     //          "Department" + data[i].department_name,
    //     //          "Price" + data[i].price,
    //     //          "Stock" + data[i].stock_quantity
    //     //         )
    //     //     log("-------------")
    //     // }
    //     log("\n-------------\n Welcome!!\n")
    //     console.table(data)
    //     log("-------------")
    //     buyItems(data)
    // });
}


// "INSERT INTO products SET ? WHERE ?",
// [
// {
//     product_name: answer3.newProduct

// },
// {
//     department_name:answer3.newDepartment
// },
// {
//     price:answer3.newPrice
// },
// {
//     stock_quantity:answer3.newStock
// },
// ],

// let arr;
//             connection.query(
//                 "SELECT * FROM products",function(err,data){
//                     if(err) throw err;
//                     for(var i =0; i<data.length; i++){
//                         if(data[i].item_id === parseInt(answer4.item_ID)){
//                             log("dunno")
//                         }
//                         arr = data[i]

//                     }

//                 log(arr)
//                 }
//             )
//             inquirer
//                 .prompt([{
//                     type: "input",
//                     name: "item_ID",
//                     message: "Enter the id you wish to update inventory of",


//                 }, {
//                     type: "input",
//                     name: "newQuantity",
//                     message: "Enter the new amount to add"
//                 }]).then(function (answer4) {



//                     if (parseInt(answer4.newQuantity)) {
//                         newstock = arr.stock_quantity + parse(answer4.newQuantity)
//                         connection.query(
//                             "UPDATE products SET ? WHERE ?",[{item_id:item_ID},{stock_quantity : newstock}],function(err){
//                                 if (err) throw err
//                                 log("it works")
//                             }
//                         )

//                         log(arr)
//                         connection.end()
//                     }




//                 })