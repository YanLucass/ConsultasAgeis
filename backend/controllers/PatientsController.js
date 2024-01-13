import { Patients } from "../models/Patients";

export class PatientsController {

    static async create(req, res) {
        const { name, phone } = req.body;
        if(!name) {
            return res.status(422).json({message: "O paciente precisa ter um nome!"});
        }

        if(!phone || phone.length > 12) {
            return res.status(422).json({message: "O paciente precisa ter um telefone! válido"});
        }

        const patientData = {
            name,
            phone
        }

        //checking if phone number belong to an registered patient.
        const patient = await Patients.getPatientByPhone(phone);
        if(patient) {
            return res.status(422).json({message: "O número de telefone já pertence a outro paciente!"});
        }
        
        try {
            const newPatient = await Patients.createPatient(patientData);
            return res.status(201).json({message: "Novo usuario cadastrado", newPatient});
        } catch (error) {
            console.log('Erro ao criar paciente', error);
        }
    }


    static async getAllPatients(req, res) {
        try {
            const patients = await Patients.getAllPatients();
            return res.json({message: "Pacientes cadastrados:", patients});
        } catch (error) {
            console.log('Erro ao pegar todos os pacientes', error);
        }
    }
}