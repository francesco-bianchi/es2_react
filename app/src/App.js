import logo from './logo.svg';
import './App.css';

function App() {

  const alunniInit = [{"id":"1","nome":"claudio","cognome":"benve"},{"id":"2","nome":"ivan","cognome":"bruno"}];
  
  const alunni = alunniInit.map(alunno =>
    <tr>
      <td>{alunno.id}</td>
      <td>{alunno.nome}</td>
      <td>{alunno.cognome}</td>
    </tr>
  );

  return (
    <div>
      <table border="1">
          {alunni}
      </table>
    </div>
  );

}

export default App;
