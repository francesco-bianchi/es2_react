import {useState} from 'react';

function AlunniRow(props) {
    const [deleting, setDelete] = useState(false);
    const alunno = props.alunno;
    const caricaAlunni = props.caricaAlunni;


    function handleClickDelete(){
        setDelete(!deleting);
    }
    async function handleClickDeleteSi(id_alunno){
        const response = await fetch('http://localhost:8080/alunni/' + id_alunno, {method: 'DELETE'});
        const data = await response.json();
        setDelete(false);
        caricaAlunni();
    }

  return (
    <tr key={alunno.id}>
        <td>{alunno.id}</td>
        <td>{alunno.nome}</td>
        <td>{alunno.cognome}</td>
        <td>
            {deleting && 
            <p>Sei sicuro? <button onClick={() => handleClickDeleteSi(alunno.id)}>Si</button> <button onClick={handleClickDelete}>No</button></p>
            }
            {!deleting && 
            <button onClick={handleClickDelete}>Delete</button>
            }
        </td>
    </tr>
    
  );
  

}

export default AlunniRow;
