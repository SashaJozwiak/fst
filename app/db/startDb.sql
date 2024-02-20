/* CREATE TABLE categories (
    id INT PRIMARY KEY,
    title VARCHAR(99) NOT NULL
);

CREATE TABLE subcategories (
    id INT PRIMARY KEY,
    title VARCHAR(99) NOT NULL,
    category_id INT REFERENCES categories(id)
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
	price_2 DECIMAL(10, 2) NOT NULL,
	price_3 DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(id)
);

====

INSERT INTO categories VALUES
(1, 'flowers'),
(2, 'bouquets'),
(3, 'flower accessories'),
(4, 'balloons'),
(5, 'gifs');


 */


CREATE TABLE categories (
    id INT PRIMARY KEY,
    title VARCHAR(63) NOT NULL
);

CREATE TABLE descriptions (
    id INT PRIMARY KEY,
    content VARCHAR(1000)
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
	img_link VARCHAR(63),
	amount INT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
	price_2 DECIMAL(12, 2) NOT NULL,
	price_3 DECIMAL(12, 2) NOT NULL,
	discount INT,
	bonuses INT,
    category_id INT REFERENCES categories(id),
    description_id INT REFERENCES descriptions(id)
);




INSERT INTO categories VALUES
(2, 'gvozdica');

INSERT INTO descriptions VALUES
(2, 'Свежие Розы из Крыма высотой 30 сантиметров'),
(3, 'Свежие Розы из Ростова-на-Дону высотой 20 сантиметров'),
(4, 'Свежие Гвоздики из Нидерландов (Голландия) высотой 20 сантиметров');


CREATE SEQUENCE article_seq START 1000;

ALTER TABLE products
ADD COLUMN art INTEGER DEFAULT nextval('article_seq');

INSERT INTO products  (title, img_link, amount, price, price_2, price_3, discount, bonuses, category_id, description_id) 
VALUES
('Роза 40см Эквадор', '1_rose30krimea', 12, 178, 158, 136, 0, 12, 1, 2),
('Роза 30см Крым', '2_rose30krimea', 32, 115, 97, 80, 0, 8, 1, 2),
('Роза 20см РНД', '3_rose30rnd', 21, 125, 112, 98, 0, 11, 1, 3),
('Гвоздика 30см Нидерланды', '3_gvozdica30niderlandi', 21, 120, 110, 92, 0, 11, 2, 4);
('Букет "Зимняя сакура"', 'sokuraцштеук_1011', 2, 1896, 1850, 1790, 0, 100, 2, 2);
SELECT * FROM products
