import logo from './logo.svg';
import './App.css';
import { Metaplex } from '@metaplex-foundation/js-next';
import { clusterApiUrl, Connection } from '@solana/web3.js';

function App() {
  const connection = new Connection(clusterApiUrl('devnet'));
  const mx = Metaplex.make(connection);
  console.log(mx);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
