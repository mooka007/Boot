-- Part I
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    item_id INTEGER REFERENCES items(item_id),
    quantity_purchased INTEGER NOT NULL
);
-- ********************************\
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
        (
            SELECT customer_id
            FROM customers
            WHERE first_name = 'Scott'
                AND last_name = 'Scott'
        ),
        (
            SELECT item_id
            FROM items
            WHERE item_name = 'Fan'
        ),
        1
    );
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
        (
            SELECT customer_id
            FROM customers
            WHERE first_name = 'Melanie'
                AND last_name = 'Johnson'
        ),
        (
            SELECT item_id
            FROM items
            WHERE item_name = 'Large Desk'
        ),
        10
    );
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
        (
            SELECT customer_id
            FROM customers
            WHERE first_name = 'Greg'
                AND last_name = 'Jones'
        ),
        (
            SELECT item_id
            FROM items
            WHERE item_name = 'Small Desk'
        ),
        2
    );
-- ***********************************
-- Part II
SELECT *
FROM purchases;
-- ********
SELECT p.*,
    c.first_name,
    c.last_name
FROM purchases p
    JOIN customers c ON p.customer_id = c.customer_id;
-- ***********
SELECT *
FROM purchases
WHERE customer_id = 5;
-- *************
SELECT p.*,
    i.item_name
FROM purchases p
    JOIN items i ON p.item_id = i.item_id
WHERE i.item_name IN ('Large Desk', 'Small Desk');
-- ************
SELECT DISTINCT c.first_name,
    c.last_name,
    i.item_name
FROM customers c
    JOIN purchases p ON c.customer_id = p.customer_id
    JOIN items i ON p.item_id = i.item_id;
-- **************
INSERT INTO purchases (customer_id, quantity_purchased)
VALUES (1, 5);
-- ************