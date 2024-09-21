import React from 'react';
import Game from './components/Game';
import { ToastContainer } from 'react-toastify';

const App = () => {
   return (
       <div className="app">
           <h1>Tic Tac Toe</h1>
           <Game />
           <ToastContainer />
       </div>
   );
};

export default App;
