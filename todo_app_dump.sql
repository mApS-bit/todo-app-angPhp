--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-0+deb12u1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-0+deb12u1)

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
-- Name: tasks; Type: TABLE; Schema: public; Owner: user_todo_app
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    numero character varying(64) NOT NULL,
    descripcion text,
    estado character varying(20) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT tasks_estado_check CHECK (((estado)::text = ANY ((ARRAY['pendiente'::character varying, 'en progreso'::character varying, 'completado'::character varying])::text[])))
);


ALTER TABLE public.tasks OWNER TO user_todo_app;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: user_todo_app
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO user_todo_app;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user_todo_app
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: user_todo_app
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: user_todo_app
--

COPY public.tasks (id, titulo, numero, descripcion, estado, fecha_creacion) FROM stdin;
37	Agregamos prueba	10	\N	completado	2025-09-04 04:50:13.85914
38	tercera	11	\N	completado	2025-09-04 04:55:09.151376
36	Una nueva aventura	1	Agregamos una nueva tarea para probar	pendiente	2025-09-04 04:35:28.21758
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user_todo_app
--

SELECT pg_catalog.setval('public.tasks_id_seq', 38, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: user_todo_app
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

