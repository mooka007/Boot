CREATE DATABASE public;

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);


INSERT INTO items (item_name, price) VALUES
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

INSERT INTO customers (first_name, last_name) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');


select * from customers
select * from items
select * from items where price>80
select * from items where price<300
select * from customers where last_name='Smith'
select * from customers where first_name='Jones'
select * from customers where first_name != 'Scott'