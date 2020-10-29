const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Apollo1215!",
    database: "company_DB"
});

connection.connect();
//Setting up a connection.query to use promises instead of callbacks
//This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;