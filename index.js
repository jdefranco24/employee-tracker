// require inquirer, mysql
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/");
const inquirer = require("inquirer");
// const connection = require("./db/connection");
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
      }
    )
    loadMainPrompts();
  })
}

function updateEmployeesRole() {
  inquirer.prompt([
    {
      name: "title",
      type: "",
      Message: "Which employee's role would you like to update?"
    },
    {

    }
  ])
}
