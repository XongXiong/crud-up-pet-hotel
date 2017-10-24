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