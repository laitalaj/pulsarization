import React from 'react';
import ReactDOM from 'react-dom';
import PulsarList from './components/PulsarList'

function App() {
    return <div align='center'>
        <h1>Hello Pulsarization!</h1>
        <PulsarList />
    </div>
}

let app = document.getElementById("app");

ReactDOM.render(<App />, app);