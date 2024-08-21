import "dotenv/config";
import mysql from "mysql2";

//criar conexão com o banco de dados
const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABE,
    port: process.env.MYSQL_PORT,
});

//CONECTAR AO BANCO
// conn.connect((err) => {
//     if(err){
//         console.error(err)
//     }
//     app.listen(PORT, () => {
//         console.log("Servidor on PORT "+PORT)
//     })

//     console.log("MYSQL Conectado!")
// })

export default conn;