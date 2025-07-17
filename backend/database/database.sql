CREATE DATABASE todopern ;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY ,
    description VARCHAR(255) 
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY ,
    email TEXT UNIQUE NOT NULL,
    username TEXT NOT NULL ,
    password TEXT NOT NULL
)