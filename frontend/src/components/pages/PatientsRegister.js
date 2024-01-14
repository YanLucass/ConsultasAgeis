import api from '../../utils/api';
import { useState } from 'react';
import styles from '../form/Form.module.css'
import { useNavigate } from 'react-router-dom';

//layouts
import Input from '../form/Input';
import useFlashMessage from '../../hooks/useFlashMessage';

function PatientsRegister() {

    const [patient, setPatient] = useState({});

    //flash message
    const { setFlashMessage } = useFlashMessage();

    //navegation 
    const navigate = useNavigate();
    function onChange(e) {
        setPatient({...patient, [e.target.name]: e.target.value});
    }


    //create a new Patient with nome and phone. Consume api from route /patient/create
    async function createPatient(patient) {
        let msgText = "Paciente cadastrado com sucesso!";
        let msgType = 'success';

        try {      
            const response = await api.post('/patients/create', patient);
            navigate('/');
        } catch (error) {
            msgText = error.response.data.message;
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    
        
    }

    function submit(e) {
        e.preventDefault();
       createPatient(patient);
    }   

   
    return (
        <div className={styles.register_container}>
            <Input 
                text="Paciente"
                type="text"
                name="name"
                placeholder="Digite o nome do paciente"
                handleOnChange={onChange}
            />

            <Input 
                text="Telefone"
                type="tel"
                name="phone"
                placeholder="ex: 81994386323"
                handleOnChange={onChange}
            />

            <input type='submit' onClick={submit} className={styles.inputButton}></input>
        </div>
    )
}

export default PatientsRegister;