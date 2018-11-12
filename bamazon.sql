DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products 
(

    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30) not null,
    department_name VARCHAR (30),
    price DECIMAL(6,2),
    stock_quantity int(100),
    product_sales DECIMAL(6,2)

);

CREATE TABLE departments 
(

    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50),
    over_head_costs DECIMAL(6,2),
    total_profit DECIMAL(6,2)

);

INSERT INTO departments(department_name,over_head_costs) VALUES("beauty",1000.00);
INSERT INTO departments(department_name,over_head_costs) VALUES("health",1000.00);
INSERT INTO departments(department_name,over_head_costs) VALUES("auto",1000.00);
INSERT INTO departments(department_name,over_head_costs) VALUES("random",1000.00);


INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES("toothbrush","health",1.25,12);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES("floss","health",0.75,17);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES("toothpaste","health",1.25,9);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES("listerine","health",0.75,24);

INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES("hairbrush","beauty",3.35,7);
INSERT INTO products (product_name, department_name,price,stock_quantity) 
VALUES("Hair dryer","beauty",52.78,42);
INSERT INTO products (product_name, department_name,price,stock_quantity)
VALUES("Beard oil","beauty",3.35,57);
INSERT INTO products (product_name, department_name,price,stock_quantity) 
VALUES("Soap","beauty",52.78,100);
