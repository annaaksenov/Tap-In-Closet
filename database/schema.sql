set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" varchar(255),
  "hashedPassword" varchar(255),
  "email" varchar(255),
  "createdAt" timestamp(6) not null default now(),
  "updatedAt" timestamp(6) not null default now()
);

CREATE TABLE "closet" (
  "itemId" serial PRIMARY KEY,
  "userId" integer,
  "image" text,
  "category" varchar(100),
  "description" text,
  "hashtag" text,
  "createdAt" timestamp(6) not null default now()
);
-- I added itemId, image, and category.
CREATE TABLE "outfits" (
  "outfitId" serial PRIMARY KEY,
  "userId" integer,
  "itemId" integer,
  "image" text,
  "category" varchar(100),
  "name" varchar(255),
  "createdAt" timestamp(6) not null default now(),
  "updatedAt" timestamp(6) not null default now()
);

CREATE TABLE "favorites" (
  "favoriteId" serial PRIMARY KEY,
  "userId" integer,
  "outfitId" integer,
  "createdAt" timestamp(6) not null default now()
);

ALTER TABLE "closet" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "outfits" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "favorites" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");
