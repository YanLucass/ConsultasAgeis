import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// A URL de conexão do banco de dados PostgreSQL
const dbURL = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: dbURL,
});

pool.connect((error, client) => {
    if (error) {
        console.error("Erro ao se conectar com o PostgreSQL", error.message);
    } else {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS patients(
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                phone VARCHAR(12) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS schedules (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                hour TIME NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                patient_id smallint REFERENCES patients(id) ON DELETE CASCADE
            );
        `;

        client.query(createTablesQuery, (error, result) => {
            error ? console.error('Erro ao criar tabelas', error) : console.log('Tabelas criadas com sucesso');
        });

        client.release();
    }
});

export default pool;