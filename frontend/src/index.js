import React from 'react';
import ReactDOM from 'react-dom';

import PulsarChart from './components/PulsarChart';
import {Content, Title} from './components/styled';

function App() {
    return <Content>
        <Title>Hello Pulsarization!</Title>
        <PulsarChart />
    </Content>
}

let app = document.getElementById("app");

ReactDOM.render(<App />, app);