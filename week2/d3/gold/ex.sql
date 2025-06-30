-- Exercise 1: DVD Rentals
SELECT rental_id,
    inventory_id,
    customer_id,
    rental_date,
    return_date
FROM rental
WHERE return_date IS NULL;
-- 
SELECT c.customer_id,
    c.first_name,
    c.last_name,
    COUNT(r.rental_id) AS unreturned_count
FROM customer c
    JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id,
    c.first_name,
    c.last_name
ORDER BY unreturned_count DESC;
-- 
SELECT f.film_id,
    f.title,
    f.description,
    f.release_year
FROM film f
    JOIN film_actor fa ON f.film_id = fa.film_id
    JOIN actor a ON fa.actor_id = a.actor_id
    JOIN film_category fc ON f.film_id = fc.film_id
    JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Action'
    AND a.first_name = 'Joe'
    AND a.last_name = 'Swank';
-- Exercise 2: Happy Halloween
SELECT s.store_id,
    c.city,
    co.country
FROM store s
    JOIN address a ON s.address_id = a.address_id
    JOIN city c ON a.city_id = c.city_id
    JOIN country co ON c.country_id = co.country_id;
-- 
SELECT i.store_id,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM inventory i
    JOIN film f ON i.film_id = f.film_id
    JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NOT NULL
GROUP BY i.store_id;
--
SELECT DISTINCT c.customer_id,
    c.first_name,
    c.last_name,
    ci.city
FROM customer c
    JOIN address a ON c.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
WHERE ci.city IN (
        SELECT c.city
        FROM store s
            JOIN address a ON s.address_id = a.address_id
            JOIN city c ON a.city_id = c.city_id
    );
--
SELECT DISTINCT c.customer_id,
    c.first_name,
    c.last_name,
    co.country
FROM customer c
    JOIN address a ON c.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
WHERE co.country IN (
        SELECT co.country
        FROM store s
            JOIN address a ON s.address_id = a.address_id
            JOIN city c ON a.city_id = c.city_id
            JOIN country co ON c.country_id = co.country_id
    );
--
SELECT f.film_id,
    f.title,
    f.description,
    f.length AS minutes,
    ROUND(f.length / 60.0, 2) AS hours,
    ROUND(f.length / 1440.0, 2) AS days
FROM film f
    LEFT JOIN film_category fc ON f.film_id = fc.film_id
    LEFT JOIN category c ON fc.category_id = c.category_id
WHERE (
        c.name != 'Horror'
        OR c.name IS NULL
    )
    AND (
        f.title NOT ILIKE '%beast%'
        AND f.title NOT ILIKE '%monster%'
        AND f.title NOT ILIKE '%ghost%'
        AND f.title NOT ILIKE '%dead%'
        AND f.title NOT ILIKE '%zombie%'
        AND f.title NOT ILIKE '%undead%'
        AND f.description NOT ILIKE '%beast%'
        AND f.description NOT ILIKE '%monster%'
        AND f.description NOT ILIKE '%ghost%'
        AND f.description NOT ILIKE '%dead%'
        AND f.description NOT ILIKE '%zombie%'
        AND f.description NOT ILIKE '%undead%'
    );
--
SELECT SUM(f.length) AS total_safe_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_safe_hours,
    ROUND(SUM(f.length) / 1440.0, 2) AS total_safe_days
FROM film f
    LEFT JOIN film_category fc ON f.film_id = fc.film_id
    LEFT JOIN category c ON fc.category_id = c.category_id
WHERE (
        c.name != 'Horror'
        OR c.name IS NULL
    )
    AND (
        f.title NOT ILIKE '%beast%'
        AND f.title NOT ILIKE '%monster%'
        AND f.title NOT ILIKE '%ghost%'
        AND f.title NOT ILIKE '%dead%'
        AND f.title NOT ILIKE '%zombie%'
        AND f.title NOT ILIKE '%undead%'
        AND f.description NOT ILIKE '%beast%'
        AND f.description NOT ILIKE '%monster%'
        AND f.description NOT ILIKE '%ghost%'
        AND f.description NOT ILIKE '%dead%'
        AND f.description NOT ILIKE '%zombie%'
        AND f.description NOT ILIKE '%undead%'
    );
--