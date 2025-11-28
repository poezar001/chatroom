import {Authorize} from "./Authorise.js";
const authObj = new Authorize();

document.querySelector("#signupform").addEventListener("submit",(e)=>{
    e.preventDefault();

    const fullname = e.target.fullname.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();


    authObj.registeruser(fullname,email,password);
    

})

