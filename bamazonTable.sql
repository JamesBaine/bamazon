create database bamazon;
use bamazon;

CREATE TABLE products (
    itemid INTEGER AUTO_INCREMENT NOT NULL,
    productname VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    price DECIMAL(10 , 4 ) NOT NULL,
    PRIMARY KEY (itemid)
);

select * from bamazon.products;

alter table products
add stockquantity integer;

insert into products(ProductName, Department,Price,StockQuantity)
values("Fender Stratocaster ","Musical Instruments", 1199.99, 65),
	("MacBook Pro", "Electronics", 1499.99, 205),
    ("Fender Rhodes Electric Piano","Musical Instruments", 2499.99,4),
    ("Xbox One", "Electronics", 299.99, 150),
    ("Scarface","Movies", 9.99, 24),
    ("Rayban Wayfarers", "Apparel", 149.99, 105),
    ("Apocalypse Now", "Movies", 9.99, 24),
    ("Hawaiian Shirt", "Apparel", 29.99, 56);

insert into products(ProductName, Department,Price,StockQuantity)
	values("The Hobbit", "Books", 8.99, 30),
		("Moby Dick", "Books", 8.99, 21);
