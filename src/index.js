import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import Conductor from './Providers/conductor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Conductor>
      <App />
    </Conductor>
  </React.StrictMode>
);
