import postgres from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.USER,
  database: process.env.DB,
  password: process.env.PWD_POSTG,
  port: process.env.DB_PORT,
  max: 20, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 5000,
};

 
export const consulta = async (consulta) =>{
  return new Promise(async (resolve, reject) => {
    let pool = new postgres.Pool(config);
    console.log('CONSULTA==>',consulta);
    // console.log('variables',process.env.PWD_POSTG,config)
    let client;
    try {
      client = await pool.connect();
      const data = await client.query(consulta);
      resolve(data.rows || data);
    } catch (error) {
      reject(error)
    } finally{
      client?.release();
      pool?.end();
    }
  })
}