--DDL 
create extension if not exists "uuid-ossp";

-- tables
-- Table: users

create table users (
	id uuid not null default uuid_generate_v4() primary key,
	login text not null,
	password text not null,
	created_at timestamp not null,
	updated_at timestamp not null
);

-- Table: carts
create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null REFERENCES users(id),
	created_at timestamp not null,
	updated_at timestamp not null,
	status text not null
);

-- Table: cart_items
create table cart_items (
	id uuid not null default uuid_generate_v4() primary key,
	cart_id uuid not null REFERENCES carts(id),
	product_id uuid not null,
	price int not null,
	count int not null
);

-- Table: orders
create table orders (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null REFERENCES users(id),
	cart_id uuid not null REFERENCES carts(id),
	payment json not null,
	delivery json not null,
	comments text not null,
	status text not null,
	total int not null
);


-- insert values
INSERT INTO users (login, password, created_at, updated_at) VALUES ('1111', '1111', '2022-01-01 10:00:00-05', '2023-01-01 10:05:00-05');
INSERT INTO users (login, password, created_at, updated_at) VALUES ('2222', '2222', '2022-01-02 10:00:00-05', '2023-01-02 10:05:00-05');
INSERT INTO users (login, password, created_at, updated_at) VALUES ('3333', '3333', '2022-01-03 10:00:00-05', '2023-01-03 10:05:00-05');
INSERT INTO users (login, password, created_at, updated_at) VALUES ('4444', '4444', '2022-01-04 10:00:00-05', '2023-01-04 10:05:00-05');

INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('faa47867-a30d-4954-bad6-f784924db4e7', '2023-12-14 19:00:00+03', '2023-12-14 19:30:00+03', 'OPEN');
INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('02bcee92-abff-4339-ac9c-32692764b53f', '2023-12-14 19:10:00+03', '2023-12-14 19:40:00+03', 'ORDERED');
INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('5282cedc-9b3f-4639-b2e1-99d24649afac', '2023-12-14 19:00:00+03', '2023-12-14 19:30:00+03', 'OPEN');
INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('a264c6b8-4e32-4d98-8fde-d565d9d9c67b', '2023-12-14 19:10:00+03', '2023-12-14 19:40:00+03', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('b1e89aa8-cfad-48f5-a2a8-746d8f156ad2', '12bcee92-abff-4339-ac9c-32692764b53f', 10, 10);
INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('b1e89aa8-cfad-48f5-a2a8-746d8f156ad2', '22bcee92-abff-4339-ac9c-32692764b53f', 20, 20);
INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('0f238a5a-d3c3-4e5e-8ab0-5c6758956bda', '32bcee92-abff-4339-ac9c-32692764b53f', 30, 30);
INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('0f238a5a-d3c3-4e5e-8ab0-5c6758956bda', '42bcee92-abff-4339-ac9c-32692764b53f', 40, 40);
INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('0406f9ce-9b56-4b50-8ebb-bcea28962656', '52bcee92-abff-4339-ac9c-32692764b53f', 50, 50);
INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('0406f9ce-9b56-4b50-8ebb-bcea28962656', '62bcee92-abff-4339-ac9c-32692764b53f', 60, 60);
INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('008f8514-7ac7-4f12-829e-b5bf1521e102', '72bcee92-abff-4339-ac9c-32692764b53f', 70, 70);
INSERT INTO cart_items (cart_id, product_id, price, count) VALUES ('008f8514-7ac7-4f12-829e-b5bf1521e102', '82bcee92-abff-4339-ac9c-32692764b53f', 80, 80);


INSERT INTO orders (user_id, cart_id, payment, delivery, comments, status, total) VALUES ('02bcee92-abff-4339-ac9c-32692764b53f', '0f238a5a-d3c3-4e5e-8ab0-5c6758956bda', '{}', '{}', 'comment', 'status', 200);
INSERT INTO orders (user_id, cart_id, payment, delivery, comments, status, total) VALUES ('faa47867-a30d-4954-bad6-f784924db4e7', 'b1e89aa8-cfad-48f5-a2a8-746d8f156ad2', '{}', '{}', 'comment2', 'status2', 300);


--DML 

--select * 
--from users;
--
--select login, password 
--from users;
--
--select login, password 
--from users 
--where login = '1111';
--
--select u.id, u.login, c.status
--from users u, carts c
--where u.id = c.user_id;
--
--select c.user_id, ci.product_id, ci.price, ci.count
--from carts as c
--inner join
--cart_items as ci
--on c.id = ci.cart_id;
--
--update users set login = '0000' where id = '79239dca-816e-4c03-a386-581980b12a4f';
--update users set password = '0000' where id = '79239dca-816e-4c03-a386-581980b12a4f';
--
--delete from users where login = '3333';