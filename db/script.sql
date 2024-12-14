CREATE TABLE users (
    email character varying(255) NOT NULL,
    BIGSERIAL NOT NULL PRIMARY KEY,
    nama character varying(20) NOT NULL,
    password character varying(255),
    balance bigint DEFAULT 0,
    avatar_url text
);