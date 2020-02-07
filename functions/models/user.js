const admin = require('firebase-admin');
// TODO: add consts for field names in the db
admin.initializeApp();
const db = admin.firestore();
let usersCollection = db.collection('testusers');
class User {
  //TODO: add data validation to all properties
    constructor(uid) {        
        if (!uid) {
          console.log("Must provide a user uid when creating a new user");
          return;
          // TODO: Add better error handling here
        }
        this.uid = uid;  // this corresponds to Outcome Tracker's "System Name ID"
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.dateCreated = Date.now();//TODO: switch this to a more readable date format
    }
    printAllFieldsToConsole() {
      console.log (
        "uid: " + this.uid + "\n" +
        "First name: " + this.firstName + "\n" +
        "Last name: " + this.lastName + "\n" +
        "email: " + this.email + "\n")
    }
    createNewUserInFirestore() {
        let currentUserDoc = usersCollection.doc(this.uid);
        currentUserDoc.set({
            created: this.dateCreated,
            uid: this.uid,
            displayName: this.firstName,
            lastName: this.lastName,
            email: this.email
          });
    }

    updateExistingUserInFirestore () {
      let currentUserDoc = usersCollection.doc(this.uid);
      if (this.firstName) {   
        currentUserDoc.update({displayName: this.firstName});
      }
      if (this.lastName) {  
        currentUserDoc.update({lastName: this.lastName});
      }
      if (this.email) {       
        currentUserDoc.update({email: this.email});
      }
    }
}
module.exports = User;
module.exports.db = db;
