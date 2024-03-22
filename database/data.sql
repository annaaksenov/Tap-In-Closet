-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "users"
("userId", "username", "hashedPassword")
values
(1, 'cat', '$argon2i$v=19$m=4096,t=3,p=1$CUXMLgvFOJ8brF/VLbI4CA$K8Vf3M6no5UFP8upRayGduk5E247n0TrnmasjB6A5pg');

insert into "closet"
("itemId", "userId", "image", "category")
values
(1, 1, '/images/IMG_2289-1711044014909.JPEG', 'Top'),
(2, 1, '/images/IMG_2624-1711044022407.JPEG', 'Top'),
(3, 1, '/images/IMG_2625-1711044039026.JPEG', 'Bottom'),
(4, 1, '/images/IMG_2293-1711044044809.JPEG', 'Bottom'),
(5, 1, '/images/IMG_2628-1711044050332.JPEG', 'Bottom'),
(5, 1, '/images/IMG_2307-1711044058685.JPEG', 'Shoes'),
(6, 1, '/images/IMG_2629-1711044063247.JPEG', 'Shoes'),
(7, 1, '/images/IMG_2295-1711044070741.JPEG', 'Dress');

insert into "outfits"
("outfitId", "userId")
values
(1, 1),
(2, 1),
(3, 1);

insert into "outfitItems"
("itemId", "outfitId")
values
(2, 1),(5, 1),
(1, 2),(4, 2), (6, 2),
(8, 3), (7, 3);
