import {Authorize} from "./Authorise.js";

const signinform = document.getElementById("signinform");
const googleloginbtn = document.getElementById("googleloginbtn");

const authObj = new Authorize();

signinform.addEventListener("submit",(e)=>{
    e.preventDefault()

    const email = document.getElementById("signinemail").value.trim();
    const password = document.getElementById("signinpassword").value.trim();

    if(!email || !password){
        alert("Please enter both email and password");
        return;
    }

    authObj.loginUser(email,password);


});

googleloginbtn.addEventListener("click",()=>{
    authObj.googleLogin();
})
