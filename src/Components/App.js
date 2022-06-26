import Grid from './Grid';
import Transport from './Transport';
import "../sass/main.scss"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="main__container">
        <div className="main">
          <Transport/>
          <Grid/>
        </div>
      </div>
    </div>
  );
}

export default App;
