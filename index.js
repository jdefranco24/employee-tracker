// require inquirer, mysql
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/");
const inquirer = require("inquirer");
const { end } = require("./db/connection");
const connection = require("./db/connection");
require("console.table");

init();
// make a connection
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}
async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee",
          value: "UPDATE_EMPLOYEE"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        },
      ]
    }
  ]);

    switch (choice) {
      case "VIEW_EMPLOYEES":
        return viewEmployees();
      case "ADD_EMPLOYEE":
        return addEmployee();
      case "VIEW_ROLES":
        return viewRoles();
      case "ADD_ROLE":
        return addRole();
      case "VIEW_DEPARTMENTS":
        return viewDepartments();
      case "ADD_DEPARTMENT":
        return addDepartment();
      case "UPDATE_EMPLOYEE":
        return updateEmployee();
      default:
        return quit();
    }
}
// grabbing all employees (works)
async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.log("\n");
  console.table(employees);

  loadMainPrompts();
  
  
}
async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

// async function addEmployee() {
//   const employees = await db.findAllEmployees();
//   const employeesChoice = employees.map(({  id, first_name, last_name }) => ({
//     name: `${first_name}`,
//     value: id
//   }));

//   const { employeeID } = await prompt([
//     {
//       type: "list",
//       name: "employeeId",
//       message: "What employee's role do you want to update?",
//       choices: employeesChoice
//     }
//   ]);
    

// }

function addEmployee() {
  inquirer.prompt([
    {
      name: "first",
      type: "input",
      message: "What is the new employee's first name? "
    },
    {
      name: "last",
      type: "input",
      message: "What is the new employee's last name? "
    },
    {
      name: "role",
      type: "input",
      message: "What is the  new employee's role number? ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "manager",
      type: "input",
      message: "What is the manager's id number that the employee will be under? ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
  ])
  .then(function(answer) {
    connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: answer.first,
      last_name: answer.last,
      role_id: answer.role || 0,
      manager_id: answer.manager || 0
    },
    function(err) {
      if (err) throw err;
      console.log("Employee added");
      // ***left off here trying to print now employee table***
      console.table(answer);
    }
  )
  loadMainPrompts();
  })

}

function addDepartment() {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "What is the name of the Department you want to add?"
    },
  ])
  .then(function(answer) {
    connection.query(
      "INSERT INTO department SET ?",
      {
        department_name: answer.department
      },
      function(err) {
        if (err) throw err;
        console.log("Department added");
        // ***left off here trying to print now employee table***
        console.table(answer);

        
      }
    )
    loadMainPrompts();
  })
}

function addRole() {
  inquirer.prompt ([
    {
      name: "title",
      type: "input",
      message: "What is the role's title that you would like to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the new role's salary?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "id",
      type: "input",
      message: "What is the department id that the new role will be under?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
    connection.query(
      "INSERT INTO roles SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.id
      },
      function(err) {
        if (err) throw err;
        console.log("Role added");
        // ***left off here trying to print now employee table***
        console.table(answer);

        
      }
    )
    loadMainPrompts();
  })
}


function updateEmployee() {
  inquirer.prompt(
    [
    {
      name: "employee",
      type: "input",
      message: "Which employee would you like to update?"

    },
    {
      name: "role",
      type: "input",
      message: "What is the new role of the employee?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    ],
    
  )
  .then(function(answer) {
    connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        role_id: answer.role || 0,
      },
      {
        id: answer.employee || 0
      },
    ],
    function(err) {
      if (err) throw err;
      console.log("Employee updated");
      // ***left off here trying to print now employee table***
      console.table(answer);
    }
  )
  loadMainPrompts();
  })
}


function quit() {
  console.table("Thank you")
}

// function updateEmployeesRole() { 
//   employeeArray();

// }

// function employeeArray() {
//   console.log("Updating an employee");

//   var query =
//     `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
//   FROM employee e
//   JOIN role r
// 	ON e.role_id = r.id
//   JOIN department d
//   ON d.id = r.department_id
//   JOIN employee m
// 	ON m.id = e.manager_id`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     const employeeChoices = res.map(({ id, first_name, last_name }) => ({
//       value: id, name: `${first_name} ${last_name}`      
//     }));

//     console.table(res);
//     console.log("employeeArray To Update!\n")

//     roleArray(employeeChoices);
//   });
// }

// function roleArray(employeeChoices) {
//   console.log("Updating an role");

//   var query =
//     `SELECT r.id, r.title, r.salary 
//   FROM role r`
//   let roleChoices;

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     roleChoices = res.map(({ id, title, salary }) => ({
//       value: id, title: `${title}`, salary: `${salary}`      
//     }));

//     console.table(res);
//     console.log("roleArray to Update!\n")

//     promptEmployeeRole(employeeChoices, roleChoices);
//   });
// }

// function promptEmployeeRole(employeeChoices, roleChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "employeeId",
//         message: "Which employee do you want to set with the role?",
//         choices: employeeChoices
//       },
//       {
//         type: "list",
//         name: "roleId",
//         message: "Which role do you want to update?",
//         choices: roleChoices
//       },
//     ])
//     .then(function (answer) {

//       var query = `UPDATE employee SET role_id = ? WHERE id = ?`
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(query,
//         [ answer.roleId,  
//           answer.employeeId
//         ],
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
//           console.log(res.affectedRows + "Updated successfully!");

//           firstPrompt();
//         });
//       // console.log(query.sql);
//     });

