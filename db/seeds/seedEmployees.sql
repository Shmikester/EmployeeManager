INSERT INTO Department (NAME)
VALUES ("Engineering"),
    ("Sales"),
    ("Legal"),
    ("Finance");

INSERT INTO Roles (TITLE, SALARY, DEPARTMENT_ID) 
VALUES ("Software Engineer", 80000, 1),
    ("Quality Assurance Engineer", 65000, 1),
    ("Sales", 45000, 2),
    ("Sales Lead", 60000, 2),
    ("Lawyer", 80000, 3),
    ("Lead Lawyer", 100000, 3),
    ("Accountant", 60000, 4);

INSERT INTO Employee (FIRST_NAME, LAST_NAME, ROLE_ID)
VALUES ("John", "Doe", 1),
    ("Jane", "Doe", 5),
    ("Billy", "Bob", 3),
    ("Joe", "Shmo", 4),
    ("Elvis", "NotPresley", 2),
    ("Bubba", "Gump", 7),
    ("Vlad", "DaMan", 6);