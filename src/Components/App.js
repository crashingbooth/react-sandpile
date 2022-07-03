import GridWrapper from './GridWrapper';
import Transport from './Transport';
import Options from './Options';
import AboutSection from './AboutSection';
import "../sass/main.scss"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Abelian Sandpile</h1>
      </header>
      <div className="main__container">
        <div className="main">
          <Transport/>
          <Options/>
          <GridWrapper/>
          <AboutSection/>
        </div>
      </div>
    </div>
  );
}

export default App;
