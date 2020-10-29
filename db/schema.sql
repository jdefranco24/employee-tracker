DROP DATABASE IF EXISTS company_DB;
CREATE database company_DB;

USE company_DB;

CREATE TABLE Department (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    department_name varchar(30) not null
);

CREATE TABLE Roles (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(30) not null,
    salary DECIMAL(10,4) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(30) not null, 
    last_name varchar(30) not null, 
    role_id INT NOT NULL, 
    manager_id INT NULL

);

INSERT INTO Employee (first_name, last_name)
VALUES ("Jon", "Stamos");

INSERT INTO Department (department_name)
VALUES ("Engineering");

INSERT INTO Roles (title, salary, department_id)
VALUES ("Manager", "105000.000", "1");