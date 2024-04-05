CREATE SEQUENCE article_seq;
CREATE SEQUENCE article_sup;
CREATE SEQUENCE category_id_seq;
CREATE SEQUENCE article_arrivals;

CREATE TABLE products (
    "art" INTEGER DEFAULT nextval('article_seq'::regclass),
    "title" VARCHAR(255) NOT NULL,
    "img_link" VARCHAR(63),
    "amount" INTEGER NOT NULL,
    "price" NUMERIC(12) NOT NULL,
    "price_2" NUMERIC(12) NOT NULL,
    "price_3" NUMERIC(12) NOT NULL,
    "discount" INTEGER,
    "bonuses" INTEGER,
    "category_id" INTEGER,
    "description_id" INTEGER,
    "cost_price" NUMERIC(12),
    "vitrine" BOOLEAN
);

CREATE TABLE suppliers (
    "name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(127),
    "email" VARCHAR(127),
    "comment" VARCHAR(1023),
    "id" INTEGER DEFAULT nextval('article_sup'::regclass)
);

CREATE TABLE descriptions (
    "id" INTEGER NOT NULL,
    "content" VARCHAR(1000)
);

CREATE TABLE categories (
    "id" INTEGER DEFAULT nextval('category_id_seq'::regclass) PRIMARY KEY,
    "category" VARCHAR(63) NOT NULL
);

CREATE TABLE arrivals_products (
    "product_art" INTEGER,
    "arrivals_art" INTEGER,
    "cost_price" NUMERIC(12),
    "cost_price_sum" NUMERIC(14),
    "amount" INTEGER
);

CREATE TYPE arrivals_status_enum AS ENUM ('Черновик', 'Открыто', 'Проведено');

CREATE TABLE arrivals (
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "art" INTEGER DEFAULT nextval('article_arrivals'::regclass),
    "supplier_id" INTEGER,
    "status" arrivals_status_enum,
    "paid" NUMERIC(14)
);

ALTER TABLE arrivals
ADD CONSTRAINT status_check CHECK (status IN ('Черновик', 'Открыто', 'Проведено'));

ALTER TABLE suppliers
ADD CONSTRAINT idx_unique_supplier_id UNIQUE (id);

ALTER TABLE arrivals
ADD CONSTRAINT arrivals_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES suppliers (id);

CREATE UNIQUE INDEX arrivals_art ON arrivals(art);
CREATE UNIQUE INDEX products_art ON products(art);

ALTER TABLE arrivals_products
ADD CONSTRAINT arrivals_products_arrivals_art_fkey FOREIGN KEY (arrivals_art) REFERENCES arrivals (art);

ALTER TABLE arrivals_products
ADD CONSTRAINT arrivals_products_product_art_fkey FOREIGN KEY (product_art) REFERENCES products (art);

ALTER TABLE descriptions
ADD CONSTRAINT descriptions_pkey PRIMARY KEY (id);

ALTER TABLE products
ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id);

ALTER TABLE products
ADD CONSTRAINT products_description_id_fkey FOREIGN KEY (description_id) REFERENCES descriptions (id);

INSERT INTO suppliers ("name", "phone_number", "email", "comment", "id")
VALUES ('Sasha', '+79456534878', 'email@email.com', 'just comment', 1);

INSERT INTO categories ("id", "category") VALUES 
(1, 'цветы'),
(2, 'букеты'),
(3, 'курс'),
(4, 'мастер-класс'),
(5, 'кат'),
(6, 'кат2');

INSERT INTO descriptions ("id", "content")
VALUES (5, 'Нет описания');
