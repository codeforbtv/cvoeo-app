const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
let usersCollection = db.collection('users');
class User {
  //TODO: add data validation to all properties
    constructor() {
        this.uid = '';
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.dateCreated = Date.now();//TODO: switch this to a more readable date format
    }
    printAllFieldsToConsole() {
      console.log (
        "uid: " + this.uid + "\n" +
        "First name " + this.firstName + "\n" +
        "Last name " + this.lastName + "\n" +
        "email " + this.email + "\n")
    }
    createNewUserInFirestore() {
        console.log("Creating a new document with uid " + this.uid + " with the following data:\n");
        this.printAllFieldsToConsole();
        usersCollection.doc(this.uid).set({
            created: this.dateCreated,
            uid: this.uid,
            displayName: this.firstName,
            lastName: this.lastName,
            email: this.email
          });
    }

    updateExistingUserInFirestore () {
      console.log("Updating uid " + this.uid + " with the following:\n");
      this.printAllFieldsToConsole();
      if (this.firstName) {   
        usersCollection.doc(this.uid).update({displayName: this.firstName});
      }
      if (this.lastName) {  
        usersCollection.doc(this.uid).update({lastName: this.lastName});
      }
      if (this.email) {       
        usersCollection.doc(this.uid).update({email: this.email});
      }
    }
}
module.exports = User;
module.exports.db = db;