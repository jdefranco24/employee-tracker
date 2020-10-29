// interaction/communication with database
const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query(
            "SELECT * FROM Employee"
        );

    }

    createEmployee(employee) {
        return this.connection.query("INSERT INTO employees SET ?", employee);
    }

    updateEmp


    findAllRoles() {
        return this.connection.query(
            "select * from roles"
        );
    }

    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?" ,
        role
        );
    }

    findAllDepartments() {
        return this.connection.query(
            "SELECT * FROM Department"
        );
    }

    createDepartment(departmentId) {
        return this.connection.query(
            "INSERT INTO department SET ?",
            departmentId
        );
    }

}

module.exports = new DB(connection);
