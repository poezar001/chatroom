import {Authorize} from "./Authorise.js";

const resetform = document.getElementById("resetform");
const msgElement = document.getElementById("msg");
const googleloginbtn = document.getElementById("googleloginbtn");

const authObj = new Authorize();

resetform.addEventListener("submit",(e)=>{
    e.preventDefault()

    const email = document.getElementById("signinemail").value.trim();
    authObj.resetPassword(email,msgElement);


});

googleloginbtn.addEventListener("click",()=>{
    authObj.googleLogin();
})
