

function Form({name}) {
    return (
        <div>
            <h1>{name}</h1>
            <label htmlFor="name">Paciente: </label>
            <input name="name" id="name" placeholder="Digite o nome do paciente" type="text"></input>
        </div>
    )
}

export default Form;