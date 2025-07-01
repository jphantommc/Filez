-- TODO
DROP TABLE IF EXISTS fileS;
DROP TABLE IF EXSITS folder CASCADE;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL,
)

CREATE TABLE files (
    id serial PRIMARY KEY,
    name text NOT NULL,
    size integer NOT NULL,
    folder_id integer REFERENCES folders(id) ON DELETE CASCADE
);