const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwer',
    database: 'db_empManager'
});


// query depts
const queryDept = () =>
{
    db.query('SELECT ID, NAME AS `DEPT` FROM Department;', (err, results) =>
    {
        console.table('Departments', results);
    });
};

// query rolse
const queryRoles = () =>
{
    db.query('SELECT Roles.ID, Roles.TITLE, Roles.SALARY, Department.NAME AS "DEPT" FROM Roles JOIN Department ON Roles.DEPARTMENT_ID = Department.ID;', (err, results) =>
    {
        console.table('Employee Roles', results);
    });
};

// query emps
const queryEmps = () =>
{
    db.query('SELECT Employee.ID, Employee.FIRST_NAME, Employee.LAST_NAME, Roles.TITLE, Roles.SALARY, Department.NAME AS "DEPT" FROM Employee JOIN Roles ON Employee.ROLE_ID = Roles.ID JOIN Department ON Roles.DEPARTMENT_ID = Department.ID;', (err, results) =>
    {
        console.table('Employees', results);
    });
};

// timeout function
const timeout = (time) =>
{
    const x = time * 1000;
    setTimeout(() => { }, x);
};

// prompt timeout function
const promptTimeout = () =>
{
    setTimeout(() => { promptUser() }, 1000);
};

// prompt user input
const promptUser = async () =>
{
    const { userInput } = await inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'userInput',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Emp Role', 'Done']
        }
    );
    if (userInput === 'View Departments')
    {
        queryDept();
        promptTimeout();
    } else if (userInput === 'View Roles')
    {
        queryRoles();
        promptTimeout();
    } else if (userInput === 'View Employees')
    {
        queryEmps();
        promptTimeout();
    } else if (userInput === 'Add Department')
    {
        //starts new prompt for adding Dept
        return inquirer.prompt(
            {
                type: 'input',
                message: 'What is your new department name?',
                name: 'deptName',
                validate: deptNameInput_1 =>
                {
                    if (deptNameInput_1)
                    {
                        return true;
                    }
                    else
                    {
                        console.log('Invalid Entry');
                        return false;
                    }
                }
            }
            // insert dept into db
        ).then(({ deptName }) =>
        {
            db.query(`INSERT INTO Department (NAME) VALUES ("${deptName}");`, (err, result_4) => { });
            timeout(1);
            queryDept();
            promptTimeout();
        });
    } else if (userInput === 'Add Role')
    {
        const deptsArray = [];
        // query depts
        db.query('SELECT NAME FROM Department;', (err_1, results) =>
        {
            for (let i = 0; i < results.length; i++)
            {
                deptsArray.push(results[i].NAME);
            };
        });
        timeout();
        // prompt for adding role
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is your roles title?',
                name: 'roleTitle',
                validate: roleTitleInput_1 =>
                {
                    if (roleTitleInput_1)
                    {
                        return true;
                    }
                    else
                    {
                        console.log('Invalid Entry');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'What is your roles salary?',
                name: 'roleSalary',
                validate: roleSalaryInput_1 =>
                {
                    if (roleSalaryInput_1)
                    {
                        return true;
                    }
                    else
                    {
                        console.log('Invalid Entry');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                message: 'Which department does this role belong to?',
                name: 'roleDept',
                choices: deptsArray
            }
            // insert into db
        ]).then((data) =>
        {
            db.query(`INSERT INTO Roles (TITLE, SALARY, DEPARTMENT_ID) VALUES ("${data.roleTitle}", ${data.roleSalary}, ${deptsArray.indexOf(data.roleDept, 0)+1});`, (err_2, result_5) => { });
            timeout(1);
            queryRoles();
            promptTimeout();
        });
    } else if (userInput === 'Add Employee')
    {
        const employeeTitlesArray = [];
        // query emp titles
        db.query('SELECT TITLE FROM Roles;', (err_3, results_1) =>
        {
            for (let i_1 = 0; i_1 < results_1.length; i_1++)
            {
                employeeTitlesArray.push(results_1[i_1].TITLE);
            };
        });
        timeout(1);
        // prompt for adding emp
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'firstName',
                validate: firstNameInput_1 =>
                {
                    if (firstNameInput_1)
                    {
                        return true;
                    }
                    else
                    {
                        console.log('Invalid Entry');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the employees last name?',
                name: 'lastName',
                validate: lastNameInput_1 =>
                {
                    if (lastNameInput_1)
                    {
                        return true;
                    }
                    else
                    {
                        console.log('Invalid Entry');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                message: 'What role is the employee?',
                name: 'empTitle',
                choices: employeeTitlesArray
            }
            // insert into db
        ]).then((data_1) =>
        {
            db.query(`INSERT INTO Employee (FIRST_NAME, LAST_NAME, ROLE_ID) VALUES ("${data_1.firstName}", "${data_1.lastName}", ${employeeTitlesArray.indexOf(data_1.empTitle, 0)+1});`, (err_4, result_6) => { });
            timeout(1);
            queryEmps();
            promptTimeout();
        });
    } else if (userInput === 'Update Emp Role')
    {
        const empsArray = [];
        const empsRoleArray = [];
        // query emp name
        db.query(`SELECT CONCAT(ID, " ", FIRST_NAME," ", LAST_NAME) AS "Employee" FROM Employee;`, (err_5, results_2) =>
        {
            for (let i_2 = 0; i_2 < results_2.length; i_2++)
            {
                empsArray.push(results_2[i_2].Employee);
            };
        });
        timeout(1);
        // query emp titles
        db.query('SELECT TITLE FROM Roles;', (err_6, results_3) =>
        {
            for (let i_3 = 0; i_3 < results_3.length; i_3++)
            {
                empsRoleArray.push(results_3[i_3].TITLE);
            };
        });
        return inquirer.prompt([
            //due to node bug need to have an 'input' type run first
            {
                type: 'input',
                message: `Press 'ENTER' to continue!`,
                name: 'emcon',
            },
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                name: 'emp',
                choices: empsArray
            },
            {
                type: 'list',
                message: 'What is their new role?',
                name: 'empsRole',
                choices: empsRoleArray
            }
        ]).then((data_2) =>
        {
            // parsing necessary info
            const x = data_2.emp;
            const empData = x.split(' ');
            const emID = empData[0];
            const emRoleID = empsRoleArray.indexOf(data_2.empsRole, 0) + 1;
            db.query(`UPDATE Employee SET ROLE_ID = ${emRoleID} WHERE Employee.ID = ${emID};`, (err_7, results_4) => { });
            timeout(1);
            queryEmps();
            promptTimeout();
        });
    } else if (userInput === 'Done')
    {
        return console.log('Exiting App');
    }
    ;
};

//initializer
promptUser();