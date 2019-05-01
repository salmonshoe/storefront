DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INT(15),
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 
("The 4 Hour Work Week", "Books", 15.99, 17),
("The War of Art", "Books", 12.50, 8),
("Electric Guitar", "Music", 135.40, 11),
("Hammer", "Tools", 6.25, 22),
("Total Money Makeover", "Books", 17, 22),
("Electric Bass", "Music", 120.99, 6),
("Roller Skates", "Sports", 37.40, 9),
("Basketball", "Sports", 15.89, 66),
("Saw", "Tools", 13.11, 40),
("Baseball Bat", "Sports", 9.5, 33);

SELECT * FROM products;