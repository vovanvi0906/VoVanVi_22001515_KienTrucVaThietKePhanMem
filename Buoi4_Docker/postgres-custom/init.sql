CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

INSERT INTO students (name, age)
VALUES
('An', 20),
('Binh', 21),
('Cuong', 22);