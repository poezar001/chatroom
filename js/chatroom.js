
import {db} from "./firebaseconfig.js";
import { collection, addDoc, onSnapshot, Timestamp, query, where ,orderBy} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
export class Chatroom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats  = collection(db,"chats");
        this.unsubscribe = null;


    }

    // create chat message
    async addChat(message){
        const now = new Date();
        const chatdata = {
            message,
            username:this.username,
            room:this.room,
            createdAt:Timestamp.fromDate(now)
        }

        try{
            const response = await addDoc(this.chats,chatdata);
            return response;

        }catch(err){
            console.error("Error adding chate:",err);
            throw err;
        }
    }
    



    // get chat message
    
    getChats(callback){

        this.unsubscribe = onSnapshot(query(this.chats,where('room',"==",this.room),orderBy('createdAt')),docSnap=>{
            docSnap.docChanges().forEach(item=>{
                // console.log(item);

                if(item.type === "added"){
                    callback(item.doc.data());
                }
            })
        });

    }

    updateRoom(room){

        this.room = room;
        // console.log("room updated",this.room);

        if(this.unsubscribe){
            this.unsubscribe();

        }
    }

    updateName(username){

        // method 1
        // this.username = username;
        // localStorage.setItem("username",username);

        // method 2

        return new Promise(reslove=>{
            this.username = username;
            localStorage.setItem("username",username);
            reslove();
        })

    }

   

}


async function testQuery() {
    const q = query(
        collection(db, "chats"),
        where("room", "==", "room1"),
        orderBy("createdAt")
    );
    
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => console.log(doc.id, doc.data()));
}

