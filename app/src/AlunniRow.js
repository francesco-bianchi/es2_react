import {useState} from 'react';

function AlunniRow(props) {
    const [deleting, setDelete] = useState(false);
    const [edit, setEdit] = useState(false);
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const alunno = props.alunno;
    const setModifica = props.setModifica;
    const setId = props.setId;
    const modifica = props.modifica;
    const caricaAlunni = props.caricaAlunni;

    
    function handleClickDelete(){
        setDelete(!deleting);
    }
    function handleClickEdit(){
        setEdit(!edit);
    }
    async function handleClickDeleteSi(id_alunno){
        const response = await fetch('http://localhost:8080/alunni/' + id_alunno, {method: 'DELETE'});
        const data = await response.json();
        setDelete(false);
        caricaAlunni();
    }
    
    async function handleClickEditSi(id_alunno){
        const response = await fetch('http://localhost:8080/alunni/' + id_alunno, 
        {method: 'PUT',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({nome: nome, cognome: cognome})
        });
        const data = await response.json();
        caricaAlunni();
    }

    return (
        <>
        <tr key={alunno.id}>

            {edit ? (
                <><td>{alunno.id}</td>
                <td><input type="text" onChange = {(evento) => setNome(evento.target.value)}></input></td>
                <td><input type="text" onChange = {(evento) => setCognome(evento.target.value)}></input></td>
                <td><button onClick={() => handleClickEditSi(alunno.id)}>Conferma</button><button onClick={handleClickEdit}>Annulla</button></td>
                </>
            ) : (
                <>
                <td>{alunno.id}</td>
                <td>{alunno.nome}</td>
                <td>{alunno.cognome}</td>
                {modifica ? (
                    <td>
                        <button onClick={() => {setModifica(); setId(alunno.id)}}>Annulla</button>
                    </td>
                ):( <>
                    {deleting ? (
                        <span>Sei sicuro? <button onClick={() => handleClickDeleteSi(alunno.id)}>Si</button> 
                        <button onClick={handleClickDelete}>No</button></span>
                    ) : (
                        <td>
                            {!edit && 
                                <button onClick={handleClickEdit}>Edit</button>
                            }

                            <button onClick={() => {setModifica(); setId(alunno.id)}}>Edit2</button>

                            {!deleting && 
                                <button onClick={handleClickDelete}>Delete</button>
                            }
                        </td>
                    )}</>
                )}
                
                </>
            )
                
            }
        </tr>
        
        </>
    );
  

}

export default AlunniRow;
