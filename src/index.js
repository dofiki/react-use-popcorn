import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';

import Stars from './components/stars';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {  
 //   <Stars maxStars={5} size={40}  color="green"/>
 }
   <App />
  </React.StrictMode>
);

