--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: closet; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.closet (
    "itemId" integer NOT NULL,
    "userId" integer,
    image text,
    category character varying(100),
    description text,
    hashtag text,
    "createdAt" timestamp(6) without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.closet OWNER TO dev;

--
-- Name: closet_itemId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."closet_itemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."closet_itemId_seq" OWNER TO dev;

--
-- Name: closet_itemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."closet_itemId_seq" OWNED BY public.closet."itemId";


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.favorites (
    "favoriteId" integer NOT NULL,
    "userId" integer,
    "outfitId" integer,
    "createdAt" timestamp(6) without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.favorites OWNER TO dev;

--
-- Name: favorites_favoriteId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."favorites_favoriteId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."favorites_favoriteId_seq" OWNER TO dev;

--
-- Name: favorites_favoriteId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."favorites_favoriteId_seq" OWNED BY public.favorites."favoriteId";


--
-- Name: outfitItems; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public."outfitItems" (
    "itemId" integer,
    "outfitId" integer
);


ALTER TABLE public."outfitItems" OWNER TO dev;

--
-- Name: outfits; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.outfits (
    "outfitId" integer NOT NULL,
    "userId" integer,
    "createdAt" timestamp(6) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(6) without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.outfits OWNER TO dev;

--
-- Name: outfits_outfitId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."outfits_outfitId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."outfits_outfitId_seq" OWNER TO dev;

--
-- Name: outfits_outfitId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."outfits_outfitId_seq" OWNED BY public.outfits."outfitId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    username character varying(255),
    "hashedPassword" character varying(255),
    email character varying(255),
    "createdAt" timestamp(6) without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp(6) without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO dev;

--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users_userId_seq" OWNER TO dev;

--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: closet itemId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.closet ALTER COLUMN "itemId" SET DEFAULT nextval('public."closet_itemId_seq"'::regclass);


--
-- Name: favorites favoriteId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.favorites ALTER COLUMN "favoriteId" SET DEFAULT nextval('public."favorites_favoriteId_seq"'::regclass);


--
-- Name: outfits outfitId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.outfits ALTER COLUMN "outfitId" SET DEFAULT nextval('public."outfits_outfitId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: closet; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.closet ("itemId", "userId", image, category, description, hashtag, "createdAt") FROM stdin;
1	1	/images/IMG_2289-1711044014909.JPEG	Top	\N	\N	2024-03-21 18:00:14.927041
2	1	/images/IMG_2624-1711044022407.JPEG	Top	\N	\N	2024-03-21 18:00:22.417404
3	1	/images/IMG_2625-1711044039026.JPEG	Bottom	\N	\N	2024-03-21 18:00:39.041428
4	1	/images/IMG_2293-1711044044809.JPEG	Bottom	\N	\N	2024-03-21 18:00:44.821199
5	1	/images/IMG_2628-1711044050332.JPEG	Bottom	\N	\N	2024-03-21 18:00:50.382499
6	1	/images/IMG_2307-1711044058685.JPEG	Shoes	\N	\N	2024-03-21 18:00:58.692284
7	1	/images/IMG_2629-1711044063247.JPEG	Shoes	\N	\N	2024-03-21 18:01:03.252846
8	1	/images/IMG_2295-1711044070741.JPEG	Dress	\N	\N	2024-03-21 18:01:10.753218
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.favorites ("favoriteId", "userId", "outfitId", "createdAt") FROM stdin;
\.


--
-- Data for Name: outfitItems; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public."outfitItems" ("itemId", "outfitId") FROM stdin;
2	1
5	1
1	2
4	2
6	2
8	3
7	3
\.


--
-- Data for Name: outfits; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.outfits ("outfitId", "userId", "createdAt", "updatedAt") FROM stdin;
1	1	2024-03-21 18:02:09.336879	2024-03-21 18:02:09.336879
2	1	2024-03-21 18:02:30.519135	2024-03-21 18:02:30.519135
3	1	2024-03-21 18:02:36.320331	2024-03-21 18:02:36.320331
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.users ("userId", username, "hashedPassword", email, "createdAt", "updatedAt") FROM stdin;
1	cat	$argon2id$v=19$m=4096,t=3,p=1$jRD6uI5LRyl7E+kfRhvdeQ$xzjTJvP0rmo9RuuLSiZ+9y0ECH7a1CKP5SQ9meU7yZ0	\N	2024-03-21 17:59:24.902149	2024-03-21 17:59:24.902149
\.


--
-- Name: closet_itemId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."closet_itemId_seq"', 8, true);


--
-- Name: favorites_favoriteId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."favorites_favoriteId_seq"', 1, false);


--
-- Name: outfits_outfitId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."outfits_outfitId_seq"', 3, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, true);


--
-- Name: closet closet_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.closet
    ADD CONSTRAINT closet_pkey PRIMARY KEY ("itemId");


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY ("favoriteId");


--
-- Name: outfits outfits_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.outfits
    ADD CONSTRAINT outfits_pkey PRIMARY KEY ("outfitId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: closet closet_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.closet
    ADD CONSTRAINT "closet_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: favorites favorites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: outfits outfits_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.outfits
    ADD CONSTRAINT "outfits_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- PostgreSQL database dump complete
--

