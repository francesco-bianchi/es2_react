import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import AlunniRow from './AlunniRow';
import AlunniInserimento from './AlunniInserimento';

function App() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoad] = useState(false);
  const [modifica, setMod] = useState(false);
  const [id, setIdUtente] = useState();
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  function setModifica(){
    setMod(!modifica);
  }

  function setId(id){
    setIdUtente(id);
  }

  async function handleClickAlunni(){
    setLoad(true);
    const response = await fetch('http://localhost:8080/alunni', {method: 'GET'});
    const data = await response.json();
    console.log(data);
    setLoad(false);
    setAlunni(data);
  }

  async function handleClickEditSi(id_alunno){
      const response = await fetch('http://localhost:8080/alunni/' + id_alunno, 
      {method: 'PUT',
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify({nome: nome, cognome: cognome})
      });
      const data = await response.json();
      setModifica();
      handleClickAlunni();
  }

  return (
    <>
      {loading && 
        <div>Caricamento in corso</div>
      }
      {!loading && 
        <div>
          {alunni.length === 0 ? (
            <button onClick={handleClickAlunni}>Carica alunni</button> 
          ):( <>
            <table className="tabellaAlunni">
              {alunni.map((alunno) => <tbody>
                <AlunniRow alunno={alunno} caricaAlunni={handleClickAlunni} setModifica={setModifica} setId={setId}/>
              </tbody>
              )}
            </table>
            <div>
                <AlunniInserimento caricaAlunni={handleClickAlunni} />
            </div>
            <div>
            {modifica &&
                    <>
                    <div>
                    <label>Nome:</label>
                    <input type="text" onChange = {(evento) => setNome(evento.target.value)}/>
                    <label>Cognome:</label>
                    <input type="text" onChange = {(evento) => setCognome(evento.target.value)}/>
                    <button onClick={() => handleClickEditSi(id)}>Save</button>
                    <button onClick={setModifica}>Annulla</button>
                    </div>
                    </>
            }
            </div>

            </>
            
          )}
        </div>
      }


    </>
  );

}

export default App;
