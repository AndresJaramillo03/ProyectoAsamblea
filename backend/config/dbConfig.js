const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  server: process.env.BD_SERVER,
  database: process.env.BD_DATABASE,
  port: 1433,
  options: {
    trustServerCertificate: true
  }
};

module.exports = {
  sql,
  dbConfig
};