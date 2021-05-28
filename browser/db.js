async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://admin:Admin@12345678@192.168.0.134:3306/_mysql");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
connect();
module.exports = {connect}