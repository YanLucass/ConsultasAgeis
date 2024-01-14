import { Scheduling } from "../models/Scheduling";

export class ScheduleController {
    static async create(req, res) {

        const { date, hour, description } = req.body;
        const id = req.params.id;

        if(!date) {
            return res.status(422).json({message: "O agendamento precisa ter uma data!"});
        }

        if(!hour) {
            return res.status(422).json({message: "O agendamento precisa ter uma hora!"});
        }

        if(!description) {
            return res.status(422).json({message: "O agendamento precisa ter uma descrição!"});
        }
       
        //check if is a retroactive date
        let currentDate = new Date();
        //remover 3 horas par ao padrão de brasilia
        currentDate.setHours(currentDate.getHours() - 3);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
     
    
        //add hour to entry
        const combinedDate = `${date}T${hour}:00.000Z`
        const inputDate = new Date(combinedDate);
    

        //ex: 2024-01-14T12:53:01.682Z  /  2024-01-14T13:22:00.000Z
         
        if (inputDate < currentDate) {
             return res.status(422).json({ message: "Opa, acho que houve um erro de digitação :) Você não pode marcar consultas no passado." });
        }

        //check if data and time are available
        const dataAndHourExists = await Scheduling.getSchedulingByDateAndHour(date, hour);
        if(dataAndHourExists) {
            return res.status(422).json({message: "Essa data e hora já está marcada, tente outro dia/horário!"});
        }

        const schedulingData = {
            date,
            hour, 
            description,
            patientId: id
        }

        try {
            const newScheduling = await Scheduling.saveScheduling(schedulingData);
            return res.status(201).json({message: "Nova consulta agendada!", newScheduling});
        } catch (error) {
            console.log('Deu erro na interação com o Model Scheduling para salvar consulta', error);
        }
    
    }
    //get all schedules
    static async getAll(req, res) {
        try {
            const schedules = await Scheduling.getAllScheduling();
            return res.json({schedules});
        } catch (error) {
            console.log('Erro ao pegar todos agendamentos!', error);
        }
    }

    //cancel schedule
    static async cancel(req, res) {
        const id = req.params.id;
        
        //check if consult exists
        const schedulingExists = await Scheduling.getScheduleById(id);


        if(!schedulingExists) {
            return res.status(422).json({message: "Esse agendamento não existe ou já foi apagado!"})
        }
        try {
            await Scheduling.cancelScheduling(id);
            return res.status(200).json({message: "Agendamento cancelada!"});
        } catch (error) {
            console.log('Erro ao cancelar consulta', error);
        }
    }


}