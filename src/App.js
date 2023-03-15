import logo from './logo.svg';
import './App.css';
import Pong from './Pong';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>
          React Pong
        </h1>
        <p>
          Built with GPT-4
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > */}
          {/* Learn React */}
        {/* </a> */}
      </header>
      <Pong />
    </div>
  );
}

export default App;
