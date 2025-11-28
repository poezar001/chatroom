// js/Authorize.js
import { auth, provider } from "./firebaseconfig.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

export class Authorize {
  constructor() {
    this.defaultprofileimg = "https://static.thenounproject.com/png/65476-200.png";

    // console.log(window.location.pathname);
    // console.log(window.location.pathname.replace(/\/[^/]*$/,'/'));
    // console.log(window.location.pathname.replace(/\/[^/]*$/,''));

    // ^ start = '/^abc/' = abc
    // $ end= '/abc$' = ... abc
    // * 0 or more = '/a/' = aaa
    // *$ qunaitifier +end = '/[0-9]*$/' = 

    // console.log(/^a/.test("abc")); // true
    // console.log(/^a/.test("bca")); // false

    // console.log(/[^a]/.test("bca")); //true, b and c are not a
    // console.log(/[^a]/.test("a")); //false


    // $ -> until end of string
    // [^/]* -> zero or more characters that are not /

    // /[^/]*$/



    // helper to redirect relative to current directory

 
    
  }

    redirectTo(page){
      const base = window.location.pathname.replace(/\/[^/]*$/,'/');
      window.location.href = base+page;
    }


  // Register user 
  async registeruser(fullname, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // update user profile
      await updateProfile(user, {
        displayName: fullname,
        photoURL: this.defaultprofileimg
      });

      await auth.currentuser.reload();

      // save username locally
      this.setLocalName(auth.currentuser);

      // Redirect to index
      // window.location.href = "../index.html";
      this.redirectTo("index.html");
      
    } catch (error) {
      console.error("Error registering users: ", error);
      window.alert(error.message);
    }
  }

  // login user
  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // use this.setLocalName (not global)
      this.setLocalName(user);


      // window.location.href = "../index.html";
      this.redirectTo("index.html");
    } catch (error) {
      console.error("Error logging in: ", error);
      window.alert(error.message);
    }
  }

  // logout user
  async logoutUser() {
    try {
      await signOut(auth);
      this.unsetLocalName();
      // window.location.href = "../signin.html";

     this.redirectTo("signin.html");

    } catch (error) {
      console.error("Error logging out: ", error);
      window.alert(error.message);
    }
  }

  // Reset password
  async resetPassword(email, msgElement) {
    try {
      await sendPasswordResetEmail(auth, email);
      msgElement.textContent = "Password reset email sent. Please check your inbox.";
      msgElement.style.color = "green";
      msgElement.style.fontSize = "11px";
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      msgElement.textContent = `Error : ${error.message}`;
      msgElement.style.color = "red";
      msgElement.style.fontSize = "11px";
    }
  }

  // google login
  async googleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      this.setLocalName(result.user);
      // window.location.href = "../index.html"; // assignment, not function call
      this.redirectTo("index.html");
    } catch (error) {
      console.error("Error with Google sign-in: ", error);
      window.alert(error.message);
    }
  }

  // Check if user is logged in 
  isLoggedIn() {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // window.location.href = "../signin.html";
        this.redirectTo("signin.html.")
      }
    });
  }

  // Get current user info
  getUser(callback) {
    onAuthStateChanged(auth, (user) => {
      if (user) callback(user);
    });
  }

  // local storage
  setLocalName(userdata) {
    // prefer displayName, fallback to email, fallback to Guest
    // const name = userdata?.displayName || userdata?.email || "Guest";
    localStorage.setItem("username",userdata.displayName || "Guest" );
  }

  unsetLocalName() {
    localStorage.removeItem("username");
  }
}
