// conexion a la base de datos

import mysql from "mysql2";

const connection = mysql.createConnection({
host: "localhost",
port: 3308,
user: "root",
password: "mi-contraseña",
database: "petanca"
});

export default connection;