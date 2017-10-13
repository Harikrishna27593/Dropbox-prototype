var mysql = require('mysql');

function getConnection(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'hk',
        password : 'hk275',
        database : 'users',
        port	 : 3306
    });
    return connection;
}

function insertData(callback,SqlQuery){

    console.log("\nSQL Query::"+SqlQuery);

    var connection=getConnection();

    connection.query(SqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}

function fetchData(callback,sqlQuery){
    res.status(401).json({message: "failed at userexists check"});
    console.log("\nSQL Query::"+sqlQuery);

    var connection=getConnection();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}
exports.insertData=insertData;
exports.fetchData=fetchData;