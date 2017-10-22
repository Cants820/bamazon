-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE products;

-- Creates the table "people" within animals_db --
CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- department name --
  price DECIMAL(10,2) NOT NULL,
  -- price --
  stocks_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stocks_quantity) 
VALUES ("Bounce Balls", "Toys", 25.35, 10)

INSERT INTO products (product_name, department_name, price, stocks_quantity) 
VALUES ("Asus Laptop","Electronics",425.50, 10);

INSERT INTO products (product_name, department_name, price, stocks_quantity) 
VALUES ("Digital Camera","Electronics",250.21,20);

INSERT INTO products (product_name, department_name, price, stocks_quantity)
VALUES ("Altair Drone", "Toys", 900.99, 20);

INSERT INTO products (product_name, department_name, price, stocks_quantity)
VALUES ("Samsung Gear S2", "Watch", 99.99, 15);



