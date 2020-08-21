import React, { useState } from "react";  //import useState
 import { Route } from "react-router-dom"; //import route

 import NavBar from "./NavBar";  //imported navbar
 import Home from "./Home"; //imported Home
 import PizzaForm from './PizzaForm'; //imported pizzaForm

 const App = () => {
   const [pizzaOrders] = useState([]);  // set the state for the pizza orders

   return (
     <>
       
       <h1>Lambda Eats</h1> 
       <NavBar />  

       <Route exact path="/">
         <Home orders={pizzaOrders} />
       </Route>  

       <Route path="/pizza">
         <PizzaForm />
       </Route>
     </>
   );
 };  // set the routes for home and pizza, appended the navBar

 export default App;

