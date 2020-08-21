import React from "react";
import { Link } from "react-router-dom";


 const NavBar = (props) => {
   return (
     <div>
       <nav>
         <Link to="/">Home</Link>  
       </nav>
     </div>
   );
 };

 export default NavBar;
