import { Pool} from 'pg';

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
});

pool.connect((error, client) => {
    if(error) {
        console.error("Erro ao se conectar com o postgreSQL", error.message);
    }
    else {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS patients(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                phone VARCHAR(12) UNIQUE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS schedules (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                hour TIME NOT NULL,
                description TEXT NOT NULL,
                patient_id smallint REFERENCES patients(id)
            );
        `

        client.query(createTablesQuery, (error, result) => {
            error ? console.error('Erro ao criar tabelas', error) : console.log('Tabelas criadas com sucesso');
         })

         client.release();
    }
   
})


export default pool;