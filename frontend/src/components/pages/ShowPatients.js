import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import styles from './ShowPatients.module.css'

function ShowPatients() {

    const [patients, setPatients] = useState([]);

    //get all patients from route patients/all.
    useEffect(() => {
        async function fetchPatients() {
            const response = await api.get('/patients/all');
           setPatients(response.data.patients);
        }

        fetchPatients();
    }, []);

    return (

        <div className={styles.central}>
        <div>   
            <h2>Pacientes cadastrados:</h2>
            <p>Clique para marcar consulta</p>
        </div>

        {/* show all patients registed */}
        {patients.map((patient, index) => (
            <div className={styles.patient} key={index}> 
                <Link to={`/make/appointment/${patient.id}`}>
                    {patient.id}<span>{patient.name}</span>
                </Link>
            </div>
        ))};
        
        </div>   
    )
}

export default ShowPatients;