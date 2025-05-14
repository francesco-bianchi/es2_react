import {useState} from 'react';

function AlunniInserimento(props) {
    const [form, viewForm] = useState(false);
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const caricaAlunni = props.caricaAlunni;

    function impostaNome(evento){ //permette di salvarsi l'evento che ha scatenato il cambiamento e prenderne il valore
        setNome(evento.target.value);
    }

    async function handleClickIns(){
        const response = await fetch('http://localhost:8080/alunni', 
        {method: 'POST',
         headers:{"Content-Type": "application/json"},
         body: JSON.stringify({nome: nome, cognome: cognome})
        });
        const data = await response.json();
        viewForm(false);
        caricaAlunni();
    }

    return (
        <>
            {!form && 
                <button onClick={() =>viewForm(true)}>Inserisci alunno</button>
            }
            {form && 
                <div>
                    <label>Nome:</label>
                    <input type="text" onChange={impostaNome}/>
                    <label>Cognome:</label>
                    <input type="text" onChange = {(evento) => setCognome(evento.target.value)}/>
                    <button onClick={handleClickIns}>Save</button>
                    <button onClick={() =>viewForm(false)}>Annulla</button>
                </div>
            }

        </>
    );

}

export default AlunniInserimento;