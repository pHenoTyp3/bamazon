const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk")
const log = console.log
let cTable = require('console.table');
let express = require("express")
// const chalkAnimation = require('chalk-animation');
var itemArr = [];

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,  
    database: "bamazon_db",
    insecureAuth: true
});

connection.connect(function(err){
    if(err) throw err;
    log(`connected. ID: ${connection.threadId}`)
  log(chalk.green.underline.bold(`|| Welcome Alex's Variety Store ||`))
    startUpData();
});

function startUpData() {
    connection.query
    ("SELECT * FROM products", function(err,data){
        if(err) throw err;
        // for(let i =  0; i < data.length; i++){
        //     log(
        //         "ID" + data[i].item_id, 
        //          "Product" + data[i].product_name,
        //          "Department" + data[i].department_name,
        //          "Price" + data[i].price,
        //          "Stock" + data[i].stock_quantity
        //         )
        //     log("-------------")
        // }
        log(chalk.blue.bold("\n-------------\n Shop to your hearts content!!!!\n"))
        console.table(data)
        log("nodemon works")
        log("-------------")
        buyItems(data)
    });
    }


    function buyItems(data){
        
        inquirer
            .prompt([{
              type: "input",
              name: "itemID",
              message: "Enter the id of the item you wish to buy",
              validate: function(value){
                if(isNaN(value) === false){
                    return true;
                } else {
                    console.log("Did not continue")
                    return false;
                }
                }
            },{
                type:"input",
                name:"quantity",
                message:"How many do you want to buy?"
            } 
        ]).then(function(answer){
          
           let itemChoice;
           for(let i = 0; i < data.length; i++){
               if(data[i].item_id === parseInt(answer.itemID)){
                    itemChoice = data[i]
               }
           }

        if(parseInt(answer.quantity) <= itemChoice.stock_quantity){
            newStock = itemChoice.stock_quantity - parseInt(answer.quantity)
            connection.query("UPDATE products SET ? WHERE ?",
            [
            {
                stock_quantity: newStock
            },
            {
                item_id:answer.itemID
            }
            
        ],function(error,data){
            if(error) throw error;
            log(data)
            let totalcost =  itemChoice.price * parseInt(answer.quantity)
            log(`You bought  ${chalk.blue(itemChoice.product_name)} for ${chalk.red(totalcost)}`)
            itemArr.push(" " + itemChoice.product_name)
     

            inquirer.prompt([
                {
                    type:"confirm",
                    message:"Do you want to buy another item?",
                    name: "anotheritem"
                }
                // ,
                // {
                //     type:"",
                //     message:"",
                //     name: ""
                // }


            ]).then(function(answer2){
                if(answer2.anotheritem){
                    startUpData()
                } else {
                    
                    log(`Enjoy your selection of:  ${chalk.blue(itemArr)} `)
                    // the above statement doesnt show if a 2nd item is purchased. how can i do that?
                    log(chalk.green("COME BACK SOON!!!"))
                    connection.end()
                }
            })
// totalCost()
        })
        } else {
            log(chalk.red("Your order quantity is too high. Try again"))
            buyItems(data)
        }
            
        })
    };

    // function totalCost(){
    //     let totalcost =  itemChoice.price * parseInt(answer.quantity)
    //     log(`you bought ${itemChoice.product_name} for ${totalcost}`)
    // }


    

