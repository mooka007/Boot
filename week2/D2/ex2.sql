select *
from customer
select concat(first_name, '  ', last_name) as full_name
from customer
select DISTINCT create_date
from customer
select *
from customer
order by first_name DESC
select film_id,
    title,
    description,
    release_year,
    rental_rate
from film
order by rental_rate ASC
SELECT address,
    phone_number
FROM address
WHERE district = 'Texas';
SELECT film_id,
    title,
    description,
    length,
    rental_rate
FROM film
WHERE title = 'Your Favorite Movie Title';
SELECT film_id,
    title,
    description,
    length,
    rental_rate
FROM film
WHERE title LIKE 'Yo%';
SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10;
SELECT *
FROM film
ORDER BY rental_rate ASC OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
SELECT c.first_name,
    c.last_name,
    p.amount,
    p.payment_date
FROM customer c
    JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id ASC;
SELECT f.*
FROM film f
    LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL;
SELECT city.city_name,
    country.country_name
FROM city
    JOIN country ON city.country_id = country.country_id;
SELECT c.customer_id,
    c.first_name,
    c.last_name,
    p.amount,
    p.payment_date
FROM customer c
    JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id;