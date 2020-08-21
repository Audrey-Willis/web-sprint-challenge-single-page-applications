import React from "react";  //imported react and useState
 import { Link } from "react-router-dom"; //imported link 

 const Home = (props) => {
   return (
     <>
       <h2>Get Fresh Pizza Delievered Today!</h2>
       <button>
         <Link to="/pizza"> Place order here!</Link>
       </button>
     </>
   );
 };
 export default Home;  //created button to make piza from homepage
