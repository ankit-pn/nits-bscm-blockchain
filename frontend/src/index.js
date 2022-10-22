import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {MantineProvider } from '@mantine/core';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider theme={{loader : 'bars' , fontFamily : "Bitter Roboto sans-serif"}} withGlobalStyles>
      <App />
    </MantineProvider>
);

