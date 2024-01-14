import pool from "../db/conn";

export class Scheduling {
    constructor(date, hour, description) {
        this.date = date;
        this.hour = hour;
        this.description = description;
    }

    static async saveScheduling(schedulingData) {

        const { date, hour, description, patientId } = schedulingData;

        try {
            const query = `INSERT INTO schedules (date, hour, description, patient_id) VALUES ($1, $2, $3, $4) RETURNING *`
            const values = [date, hour, description, patientId];
            const result = await pool.query(query, values); 
            return result.rows[0];

        } catch (error) {
            console.log('Erro inserir consulta na tabela de agendamentos', error);
        }
    }

    static async getSchedulingByDateAndHour(date, hour) {
        try {
            const query = `SELECT * FROM schedules WHERE date = $1 AND hour = $2`
            const values = [date, hour];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.log('Erro ao buscar por data e horário', error);
        }
    }

    //get all
    static async getAllScheduling() {
        try {
            const query = `SELECT schedules.*, patients.name AS patient_name, patients.phone AS patient_phone
            FROM schedules 
            JOIN patients ON schedules.patient_id = patients.id 
            order by schedules.date DESC, schedules.hour DESC
            `
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.log('Erro ao buscar todos agendamentos!', error);
        }
    }

    //cancel schedule
    static async cancelScheduling(id) {
        try {
            const query = `DELETE FROM schedules WHERE id = $1 `
            const value =[id];
            await pool.query(query, value);
        } catch (error) {
            console.log('Erro ao cancelar agendamento', error);
        }
    }

    //pegar consulta por id
    static async getScheduleById(id) {
        try {
            const query = `SELECT * FROM schedules WHERE id = $1 `
            const value =[id];
            const result = await pool.query(query, value);
            return result.rows[0];
        } catch (error) {
            console.log('Erro ao pegar consulta por id', error);
        }
    }

}


