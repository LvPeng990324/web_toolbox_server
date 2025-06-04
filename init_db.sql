CREATE TABLE user(
    `username` VARCHAR(128) PRIMARY KEY,
    `password` VARCHAR(128) NOT NULL,
    `role` VARCHAR(32) NOT NULL,
)