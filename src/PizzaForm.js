import React, {useState,useEffect} from "react";
 import * as yup from "yup";
 import axios from "axios";
 import { Button } from 'reactstrap';



 const PizzaForm = () => {
     //setting initial post to empty
     const [post,setPost] = useState({});

     //made a variable for the blank pizza for resetting
     const blankPizza = {
         name: "",
         size:"",
         pepperoni:false,
         sausage:false,
         anchovies:false,
         special:""
     }
     //state for button
     const [buttonDisabled, setButtonDisabled] = useState(true)
     

     //blank state for errors
     const [errors,setErrors] = useState({
             name: "",
             size:"",
             pepperoni:"",
             sausage:"",
             bacon:"",
             anchovies:"",
             special:""
     });
     //pizza Form Schema Object shape
         const pizzaSchema = yup.object().shape({
             name:yup.string().test('len','Must Include a Name for the Order and consist of more than 2 characters', val => val.length > 2),
             size:yup.boolean().oneOf(["Small","Medium","Large"]),
             pepperoni: yup.boolean().oneOf([true,false]),
             sausage: yup.boolean().oneOf([true,false]),
             bacon: yup.boolean().oneOf([true,false]),
             anchovies: yup.boolean().oneOf([true,false]),
             special:yup.string()
         })

     //validating Change to be used on change function
     const validateChange = (e) => {
         yup
         .reach(pizzaSchema, e.target.name) //use the form schema object variable
         .validate(e.target.value)
         .then(valid => {
             setErrors({...errors, [e.target.name]: ""})
             console.log('success')
         }) 
         .catch(err => {
             console.log(err);
             setErrors({...errors,[e.target.name]:err.errors[0] })
         })

     }
     
     //database of post (a place to push the changes)
         const data = [];

     //forms current state
         const [formState,setForm] = useState(blankPizza); //placed in the blank pizza

     //on Change Function with the form state change, and validation callback
         const inputChange = e => {
             e.persist();
             const newFormData = {
                 ...formState, [e.target.name] : e.target.type === "checkbox" ? e.target.checked : e.target.value
             } //new data to change state
             validateChange(e);
             setForm(newFormData);
         }

     //submit function (posted to database)
         const formSubmit = e => {
             e.preventDefault(); //so the page won't reload
             axios.post("https://reqres.in/api/users",formState) //so the order will be posted to the server
                 .then(response => {
                     setPost(response.data); //set the order
                     data.push(post); //pushing the order 
                     setForm(blankPizza); //going back to blank pizza
                 })
                 .catch(err => {
                     console.log(err);
                 });
         }
                 //use effect to make sure person provides a name 
                 useEffect(() => {
                     if(formState.name.length < 2){
                        setButtonDisabled(true);
                    }else{setButtonDisabled(false)}
                }, [formState]);

    return( <div className="orderForm">
         <form onSubmit = {formSubmit}/*callback to submit function */>
             
             <label htmlFor= "name"> 
                 Name:
                 <input type = "text" name ="name" value = {formState.name} onChange = {inputChange} data-cy="name" />
                 {errors.name.length > 2 ? <p>{errors.name}</p> : null } 
             </label>
             
             
             <div>
             <label htmlFor= "size">
                  Size:
                 <select name ="size" data-cy="size">
                     <option value = "Small" data-cy="Small">Small</option>
                     <option value = "Medium" data-cy="Medium">Medium</option>
                     <option value = "Large" data-cy="Large">Large</option>
                 </select>
             </label>
             </div>

             <div>
             <h2> Choose your toppings!</h2>
             
             <li /* topping one */> 
             <label htmlFor= "pepperoni">
                 <input type = "checkbox" checked = {formState.pepperoni} value = {formState.pepperoni} name ="pepperoni" onChange = {inputChange} data-cy="pepperoni" />
                 Peperoni
             </label>
             </li>
             
             <li /* topping two */>
             <label htmlFor= "sausage">
                <input type = "checkbox" name ="sausage" checked ={formState.sausage} value ={formState.sausage} onChange = {inputChange} data-cy="sausage"/>
                 Sausage
                 </label>
             </li>
             
             <li /* topping three */>
             <label htmlFor= "bacon">
                <input type = "checkbox" name ="bacon" checked = {formState.bacon} value = {formState.bacon} onChange = {inputChange} data-cy="bacon" />
                Bacon
             </label>
             </li>
             
             <li /* topping four */>
             <label htmlFor= "anchovies">
                <input type = "checkbox" name ="anchovies" checked = {formState.anchovies} value = {formState.anchovies} onChange = {inputChange} data-cy = "anchovies" />
                 anchovies
             </label>
             </li>

             </div>
                
             <label htmlFor= "special" /* special requests */>
                 <p>
                 Any special Directions for your order?
                 </p>
                 <textarea name ="special" value = {formState.special} onChange = {inputChange} data-cy="special"/>
                 {errors.special.length > 2 ? <p>{errors.special}</p> : null}
             </label>
             
             <div>
             <Button disabled = {buttonDisabled} type = "submit" color = "primary" data-cy= "submit" > Submit </Button>
             <pre> Confirmation {JSON.stringify(post, null, 2)} </pre>
             </div>
         </form>
     </div>
    )
 }

 export default PizzaForm;
