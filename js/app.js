// import { use } from "react";
import { MessageUI } from "./MessageUI.js";
import { Chatroom } from "./chatroom.js";
import { auth, db } from "./firebaseconfig.js";


//get dom query
const chatsidebar = document.querySelector(".chat-sidebars ");
const updatemsg = document.querySelector(".update-msg");
const newnameform = document.querySelector(".new-nameform");
const chatlistgroup = document.querySelector(".chat-lists");
const newchatform = document.querySelector(".new-chatform");
const profilename = document.querySelector("#profilename");

const username = localStorage.username ? localStorage.username :"Guest";
newnameform.name.placeholder =  `username is ${username}`
profilename.textContent = username; 

// instance chat room
const chatroomObj = new Chatroom("general",username);
const messageuiObj = new MessageUI(chatlistgroup);

// add new message
newchatform.addEventListener('submit',e=>{
    e.preventDefault();

    const message = newchatform.message.value.trim();
    // console.log(message);

    chatroomObj.addChat(message)
        .then(()=>newchatform.reset())
        .catch(err=>console.err(err));
});


// update username
newnameform.addEventListener('submit',e=>{
    e.preventDefault();

    const newname = newnameform.name.value.trim();
    // console.log(newname);
    // method1
    // chatroomObj.updateName(newname);
    // newnameform.reset();

    // method 2

    chatroomObj.updateName(newname)
        .then(()=>newnameform.reset())
        .catch(err=>console.log(err));
    
    updatemsg.innerText   = `Your name was update to ${newname}`;
    setTimeout(()=>updatemsg.innerText='',3000);

    newnameform.name.placeholder =  `username is ${newname}`
    profilename.textContent = newname; 
});


//get chat and render li
chatroomObj.getChats((data)=>{
    messageuiObj.renderli(data);
 });


//change chat room
 chatsidebar.addEventListener('click',e=>{
    if(e.target.tagName === "BUTTON"){
        // console.log("i am = ",e.target.getAttribute('id'));
        // chatroomObj.updateRoom(e.target.getAttribute('id'));
        
        messageuiObj.clearli();
        chatroomObj.updateRoom(e.target.getAttribute('id'));
        chatroomObj.getChats(data=>messageuiObj.renderli(data));


    }
 });

 
 







