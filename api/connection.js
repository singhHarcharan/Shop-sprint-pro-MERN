const mysql = require("mysql");

// DB Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "system",
    database: "online_shopping"
});

connection.connect((error) => {
    if (error) {
        // console.log("Error");
        console.log(error.message);
    } else {
        console.log("Database Connected");
    }
});

module.exports = connection;
