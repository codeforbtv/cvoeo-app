const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
let usersCollection = db.collection('users');
class User {
  //TODO: at data validation to all properties
    constructor() {
        this.uid = '';
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.dateCreated = Date.now();//TODO: switch this to a more readable date format
    }

    createNewUserInFirestore() {
        usersCollection.doc(this.uid).set({
            created: this.dateCreated,
            uid: this.uid,
            displayName: this.firstName,
            lastName: this.lastName,
            email: this.email
          });
    }

    updateExistingUserInFirestore () {
      if (this.firstName) {
        console.log ("Updating first name");          
        usersCollection.doc(this.uid).update({displayName: this.firstName});
      }
      if (this.lastName) {
        console.log ("Updating Last name");          
        usersCollection.doc(this.uid).update({lastName: this.lastName});
      }
      if (this.email) {
        console.log ("Updating email address");          
        usersCollection.doc(this.uid).update({email: this.email});
      }
    }
}
module.exports = User;
module.exports.db = db;