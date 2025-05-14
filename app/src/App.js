import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import AlunniRow from './AlunniRow';
import AlunniInserimento from './AlunniInserimento';

function App() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoad] = useState(false);

  async function handleClickAlunni(){
    setLoad(true);
    const response = await fetch('http://localhost:8080/alunni', {method: 'GET'});
    const data = await response.json();
    console.log(data);
    setLoad(false);
    setAlunni(data);
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
                <AlunniRow alunno={alunno} caricaAlunni={handleClickAlunni} />
              </tbody>
              )}
            </table>
            <div>
                <AlunniInserimento caricaAlunni={handleClickAlunni}/>
            </div></>
          )}
        </div>
      }


    </>
  );

}

export default App;
