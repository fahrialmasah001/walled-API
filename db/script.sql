CREATE TABLE users (
    email character varying(255) NOT NULL,
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username character varying(20) NOT NULL,
    fullname character varying(70) NOT NULL,
    password text,
    avatar_url text
);

CREATE TABLE wallets (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_number character varying(20) NOT NULL UNIQUE,
    balance numeric(12, 2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);