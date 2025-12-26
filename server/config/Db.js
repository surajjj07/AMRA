import mysql from "mysql2/promise";

const db =await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Suraj@9334",
    database:"amra"
})

export default db;
