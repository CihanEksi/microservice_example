require('dotenv').config();
const mysql = require('mysql2/promise');

const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

async function createDatabaseAndTable() {
  try {

    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    });


    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`
    );


    await connection.changeUser({ database: MYSQL_DATABASE });


    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        _id INT AUTO_INCREMENT PRIMARY KEY,
        status VARCHAR(255) NOT NULL DEFAULT 'Yeni',
        customerId VARCHAR(255) NOT NULL,
        totalAmount DECIMAL(10, 2) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS sale_logs (
        _id INT AUTO_INCREMENT PRIMARY KEY,
        status VARCHAR(255) NOT NULL DEFAULT 'Yeni',
        customerId VARCHAR(255) NOT NULL,
        saleId INT NOT NULL,
        totalAmount DECIMAL(10, 2) DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (saleId) REFERENCES sales(_id)
        )
    `);

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS notes (
        _id INT AUTO_INCREMENT PRIMARY KEY,
        saleId INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        note TEXT DEFAULT NULL,
        date TIMESTAMP DEFAULT NULL,
        saleStatus VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (saleId) REFERENCES sales(_id)
        )
    `);

    console.log('DB created successfully!');
    connection.end();
  } catch (error) {
    console.error('DB creation failed:', error);
  }
}

const pool =  mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
module.exports = {
    pool,
    createDatabaseAndTable
}