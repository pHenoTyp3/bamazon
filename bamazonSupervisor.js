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
 
});