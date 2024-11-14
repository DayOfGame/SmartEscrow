import React from 'react';
import ReactDOM from 'react-dom';
import MainApplication from './MainApplication';
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <MainApplication />
  </React.StrictMode>,
  document.getElementById('app-root')
);