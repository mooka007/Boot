UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea', 'Marc')
    AND last_name = 'Benichou';
-- ********************************************* --
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David'
    AND last_name = 'Grez';
-- ********************************************* --
DELETE FROM students
WHERE first_name = 'Lea'
    AND last_name = 'Benichou';
-- ********************************************* --
SELECT COUNT(*) AS total_students
FROM students;
-- ********************************************* --
SELECT COUNT(*) AS students_after_2000
FROM students
WHERE birth_date > '2000-01-01';
-- ********************************************* --
ALTER TABLE students
ADD COLUMN math_grade INTEGER;
-- ********************************************* --
-- Add 80 to student with id 1
UPDATE students
SET math_grade = 80
WHERE id = 1;
-- Add 90 to students with ids 2 or 4
UPDATE students
SET math_grade = 90
WHERE id IN (2, 4);
-- Add 40 to student with id 6
UPDATE students
SET math_grade = 40
WHERE id = 6;
-- ********************************************* --
SELECT COUNT(*) AS students_above_83
FROM students
WHERE math_grade > 83;
-- ********************************************* --
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT first_name,
    last_name,
    birth_date,
    70
FROM students
WHERE first_name = 'Omer'
    AND last_name = 'Simpson'
LIMIT 1;
-- ********************************************* --
SELECT first_name,
    last_name,
    COUNT(math_grade) AS total_grades
FROM students
GROUP BY first_name,
    last_name;
-- ********************************************* --
SELECT SUM(math_grade) AS total_grade_sum
FROM students;
-- ********************************************* --