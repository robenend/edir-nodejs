const dbConn = require("../config/db_Connection");

exports.queryCount = async(search, string) => {
    var sql, result, total_rows;

    if (search !== "") {
        sql = `SELECT COUNT(*) as num FROM timeline WHERE category = '${string}' AND title like '%${search}%'`;
    } else {
        sql = `SELECT COUNT(*) as num FROM timeline WHERE category = '${string}'`;
    }

    total_rows = 0;

    dbConn.query(sql, async(error, res) => {
        if (error) {
            console.log(error);
            throw error;
        } else {

            total_rows = res[0].num;
        }
    });

    return total_rows;
}