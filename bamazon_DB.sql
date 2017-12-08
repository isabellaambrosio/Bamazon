-- 1. Create a MySQL Database called `bamazon`.

-- 2. Then create a Table inside of that database called `products`.

-- 3. The products table should have each of the following columns:

--   * item_id (unique id for each product)

--   * product_name (Name of product)

--   * department_name

--   * price (cost to customer)

--   * stock_quantity (how much of the product is available in stores)

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(11),
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("plate", "kitchen", "10,00", 20);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("glasses", "kitchen", "3,00", 20);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spoons", "kitchen", "1,00", 20);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pillow", "home essentials", "15,00", 20);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blanket", "home essentials", "20,00", 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("picture frame", "home essentials", "15,00", 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("printer", "office", "70,00", 20);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notepad", "office", "5,00", 20);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("stapler", "office", "10,00", 20);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mouse pad", "office", "17,00", 20);








