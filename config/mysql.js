const mysql = require("mysql2/promise");

// 创建数据库连接
const pool = mysql.createPool({
  host: "localhost", // host
  port: "3306", // 端口 默认
  database: "blog", // 数据库名称
  user: "root", // 用户名
  password: "admin123", //密码
});

// 封装 SQL 查询函数
async function executeQuery(sql, values) {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(sql, values);
    // console.log("sql: %s,\nrows: %o,\nfields: %o;", sql, rows, fields);
    connection.release();
    return rows;
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error;
  }
}

// 检测数据库是否连接成功函数
async function main() {
  try {
    await executeQuery("SELECT 1", []);
    console.log("数据库连接成功");
  } catch (error) {
    // 处理错误
    console.error("数据库连接失败！", error);
  }
}

// 执行函数
main();

module.exports = executeQuery;
