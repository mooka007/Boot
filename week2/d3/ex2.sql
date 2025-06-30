--1
/*UPDATE new_film
 SET language_id = 2  -- Assuming 2 is a valid language ID (e.g., Spanish)
 WHERE id IN (1, 2); -- Update films with id 1 and 2*/
--2
/*Assuming your customer table has foreign keys defined, a typical foreign key might reference a language table or a membership table. You can check the foreign keys using a command like sql
 
 SHOW CREATE TABLE customer;  -- MySQL Example*/
--3:drop table customer_review
--Drop table customer_review
--4
/*SELECT COUNT(*) AS outstanding_count
 FROM rentals 
 WHERE returned = 0; */
--5
/*SELECT m.title, m.rental_price
 FROM movies m
 JOIN rentals r ON m.id = r.movie_id
 WHERE r.returned = 0  
 ORDER BY m.rental_price DESC
 LIMIT 30;*/
--1
/*SELECT title
 FROM films
 WHERE description LIKE '%sumo wrestler%'
 AND id IN (
 SELECT film_id FROM film_actors WHERE actor_name = 'Penelope Monroe'
 );*/
--2
/*SELECT title
 FROM films
 WHERE duration < 60 AND rating = 'R';*/
--3
/*SELECT f.title
 FROM rentals r
 JOIN films f ON r.film_id = f.id
 WHERE r.customer_id = (SELECT id FROM customers WHERE name = 'Matthew Mahan')
 AND r.amount > 4.00
 AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';*/
--4
/*SELECT title
 FROM films
 WHERE (title LIKE '%boat%' OR description LIKE '%boat%')
 AND id IN (
 SELECT DISTINCT film_id
 FROM rentals r
 WHERE r.customer_id = (SELECT id FROM customers WHERE name = 'Matthew Mahan')
 );*/