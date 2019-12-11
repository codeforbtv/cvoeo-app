const {db} = require('./user');
let usersCollection = db.collection('users');
let userDoc;
class Goal {
    //TODO: add data validation to all properties
      constructor(useruid) {
          if (!useruid) {
            console.log("Must provide a user uid when creating a new goal");
            return;
            // Add better error handling
          }
          this.goaluid = '';
          this.useruid = useruid;//unique id of the user which this goal corresponds to
          this.goalType = '';
          this.goalDueDate = '';
          this.goalNotes = '';
          this.isGoalComplete = '';
          this.created = Date.now();
          userDoc = usersCollection.doc(this.useruid);
      }

      printAllFieldsToConsole() {
        console.log (
            "User uid: " + this.useruid + "\n" +
            "Goal uid: " + this.goaluid + "\n" +
            "Goal type: " + this.goalType + "\n" +
            "Goal due date: " + this.goalDueDate + "\n" +
            "Goal notes: " + this.goalNotes + "\n" +
            "Goal Complete?: " + this.isGoalComplete + "\n")
        }

      createNewGoalInFirestore() {        
        console.log("Creating a new goal for user " + this.useruid + " with the following data:\n");
        this.printAllFieldsToConsole();
        userDoc.collection('goals').doc(this.goaluid).set({
            created: this.created,
            goaluid: this.goaluid,
            useruid: this.useruid,
            goalType: this.goalType,
            goalDue: this.goalDueDate,
            goalNotes: this.goalNotes,
            isGoalComplete: this.isGoalComplete
          });
        }

      updateExistingGoalInFirestore () {
        let goalDoc = userDoc.collection('goals').doc(this.goaluid);
        console.log("Updating goal id " + this.goaluid + " with the following:\n");
        this.printAllFieldsToConsole();
        if (this.goalType) {   
          goalDoc.update({goalType: this.goalType});
        }
        if (this.goalDueDate) {  
          goalDoc.update({goalDue: this.goalDueDate});
        }
        if (this.goalNotes) {       
          goalDoc.update({goalNotes: this.goalNotes});
        }
        if (this.isGoalComplete) {       
          goalDoc.update({isGoalComplete: this.isGoalComplete});
          }
      }
  }
  module.exports = Goal;