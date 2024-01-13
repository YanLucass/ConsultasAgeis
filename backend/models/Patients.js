import pool from '../db/conn';

export class Patients {

    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    static async createPatient(patientsData) {
        try {
            const { name, phone } = patientsData;
            const query = `INSERT INTO patients (name, phone) VALUES ($1, $2) RETURNING *`
            const values = [name, phone];
            const result = await pool.query(query, values);
            return result.rows[0];

        } catch (error) {
            console.log('Erro ao criar registro em patients', error);
        }
    }

    static async getPatientByPhone(phone) {
        try {
            const query = `SELECT * FROM patients WHERE phone = $1`
            const value = [phone];
            const result = await pool.query(query, value);
            return result.rows[0];
            
        } catch (error) {
            console.log('Erro ao pegar paciente por telefone', error);  
        }
    }

    static async getAllPatients() {
        try {
            const query = `SELECT * FROM patients`
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.log('Erro ao pegar todos pacients', error);
        }
    }
}