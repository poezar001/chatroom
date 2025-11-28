// // import {Authorize} from "./Authorise.js";
// // import { MessageUI } from "./MessageUI.js";

// const logoutbtn = document.getElementById("logoutbtn");

// const authObj = new Authorize();
// const msguiObj  = new MessageUI();

// authObj.getUser((data)=>{
//     if(data){
//         console.log(data);
//         msguiObj.userInfo(data);
//     }
// })



// logoutbtn.addEventListener("click",()=>{
//     authObj.logoutUser();


// })




import { Authorize } from "./Authorise.js";
import { MessageUI } from "./MessageUI.js";

const authObj = new Authorize();

// Get UL element
const userinfoList = document.querySelector("#userinfo");

// Pass UL to MessageUI
const ui = new MessageUI(userinfoList);

// Listen for user status
authObj.getUser((user) => {
    ui.userInfo(user);
});

// Logout button
const logoutbtn = document.querySelector("#logoutbtn");
logoutbtn.addEventListener("click", () => {
    authObj.logout();
});
