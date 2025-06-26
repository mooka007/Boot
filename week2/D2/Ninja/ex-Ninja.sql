-- 1-\ 
SELECT first_name,
    last_name
FROM customer
ORDER BY last_name ASC,
    first_name ASC
LIMIT 2;
-- 2-\
DELETE FROM purchases
WHERE customer_id = (
        SELECT customer_id
        FROM customer
        WHERE first_name = 'Scott'
            AND last_name = 'Scott'
    );
-- 3-\
SELECT *
FROM customer
WHERE first_name = 'Scott'
    AND last_name = 'Scott';
-- 4-\
SELECT p.*,
    c.first_name,
    c.last_name
FROM purchases p
    LEFT JOIN customer c ON p.customer_id = c.customer_id;
-- 5-\
SELECT p.*,
    c.first_name,
    c.last_name
FROM purchases p
    JOIN customer c ON p.customer_id = c.customer_id;