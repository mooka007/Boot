-- 1
SELECT *
FROM language;
-- 2
SELECT film.title,
    film.description,
    language.name AS language_name
FROM film
    INNER JOIN language ON film.language_id = language.language_id;
-- 3]
SELECT film.title,
    film.description,
    language.name AS language_name
FROM language
    LEFT JOIN film ON language.language_id = film.language_id;
--4
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
-- Add some films
INSERT INTO new_film (name)
VALUES ('The Matrix Resurrections'),
    ('Dune: Part Two'),
    ('Everything Everywhere All At Once');
-- 5
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER NOT NULL REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score SMALLINT CHECK (
        score BETWEEN 1 AND 10
    ),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 6
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES (
        1,
        1,
        'Mind-blowing sequel',
        9,
        'A worthy continuation of the Matrix saga...'
    ),
    (
        2,
        2,
        'Un chef-d''œuvre visuel',
        10,
        'La photographie et les effets spéciaux sont incroyables...'
    );
-- 7
DELETE FROM new_film
WHERE id = 1;
SELECT *
FROM customer_review
WHERE film_id = 1;