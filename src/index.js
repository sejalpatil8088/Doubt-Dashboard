import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

);







// import React from "react";
// import ReactDOM  from "react-dom";
// import Login from "./Components/Login";
// import "./index.css"




// function App(){
//   return(
//     <div>
//        <Login/>
//     </div>
//   )
// }




// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App/>);