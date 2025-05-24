import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const stringConection = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  port: process.env.PORT ? parseInt(process.env.PORT) : 1433,
  options: {
    trustServerCertificate: true
  }
}

export const dbConfig = stringConection
export { sql }
