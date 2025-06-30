-- 
SELECT f.film_id,
    f.title,
    f.rating,
    f.rental_rate
FROM film f
WHERE f.rating IN ('G', 'PG')
    AND f.film_id NOT IN (
        -- Films currently rented out
        SELECT DISTINCT i.film_id
        FROM inventory i
            JOIN rental r ON i.inventory_id = r.inventory_id
        WHERE r.return_date IS NULL
    )
ORDER BY f.title;
--
CREATE TABLE children_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL REFERENCES film(film_id) ON DELETE CASCADE,
    inventory_id INTEGER REFERENCES inventory(inventory_id),
    child_name VARCHAR(100) NOT NULL,
    parent_email VARCHAR(255),
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_inventory FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id) ON DELETE
    SET NULL
);
--
-- Add some test entries
INSERT INTO children_waiting_list (film_id, child_name, parent_email)
VALUES (1, 'Emma Johnson', 'mom@example.com'),
    -- Assuming film_id 1 is G/PG
    (1, 'Liam Smith', 'dad@example.com'),
    (3, 'Olivia Brown', 'parent@example.com'),
    -- Assuming film_id 3 is G/PG
    (1, 'Noah Wilson', 'guardian@example.com');
--
SELECT f.film_id,
    f.title,
    f.rating,
    COUNT(w.waiting_id) AS num_waiting,
    STRING_AGG(w.child_name, ', ') AS waiting_children
FROM film f
    LEFT JOIN children_waiting_list w ON f.film_id = w.film_id
    AND w.is_active = TRUE
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id,
    f.title,
    f.rating
HAVING COUNT(w.waiting_id) > 0
ORDER BY num_waiting DESC;