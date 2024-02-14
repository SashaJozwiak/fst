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


INSERT INTO products VALUES
(2, 'Роза 30см Крым', '2_rose30krimea', 32, 115, 97, 80, 0, 8, 1, 2),
(3, 'Роза 20см РНД', '3_rose30rnd', 21, 125, 112, 98, 0, 11, 1, 3),
(4, 'Гвоздика 30см Нидерланды', '3_gvozdica30niderlandi', 21, 125, 112, 98, 0, 11, 2, 4);
