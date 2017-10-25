CREATE TABLE "owners" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(20),
	"last_name" VARCHAR(40)
);

CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"breed" VARCHAR(100),
	"color" VARCHAR(50),
	"owner_id" INTEGER REFERENCES "owners"
);

CREATE TABLE "visits" (
	"id" SERIAL PRIMARY KEY,
	"check-in_date" DATE,
	"check-out_date" DATE,
	"pet_id" INTEGER REFERENCES "pets"
);

INSERT INTO "owners" ("first_name", "last_name")
VALUES ('Aaron', 'Kvarnlov-Leverty'),
('Laura', 'Goetz'),
('Xong', 'Xiong'),
('Hanna', 'Nguyen');


INSERT INTO "pets" ("name", "breed", "color", "owner_id")
VALUES ('Sunny', 'Pitbulls', 'Blue', 1),
('Winnie', 'Crogi', 'Red', 2),
('Kitty', 'Australian Sheperd', 'Orange', 3),
('Panda', 'Malamute', 'White', 4);



INSERT INTO "visits" ("check-in_date", "check-out_date", "pet_id")
VALUES ('01/01/2017', '01/30/2017', 1),
('02/01/2017', '02/28/2017', 2),
('03/01/2017', '03/30/2017', 3),
('04/01/2017', '04/30/2017', 4);

