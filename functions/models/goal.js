const {db} = require('./user');
let usersCollection = db.collection('testusers');
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
          this.goalCategory = '';
          this.goalDate = '';
          this.goalProgress = '';
          this.isGoalComplete = false;
          this.goalNextSteps = '';
          this.created = Date.now();
          userDoc = usersCollection.doc(this.useruid);
      }

      printAllFieldsToConsole() {
        console.log (
            "User uid: " + this.useruid + "\n" +
            "Goal uid: " + this.goaluid + "\n" +
            "Goal category: " + this.goalCategory + "\n" +
            "Goal date: " + this.goalDate + "\n" +
            "Goal progress: " + this.goalProgress + "\n" +
            "Goal complete?: " + this.isGoalComplete + "\n" +
            "Goal next steps: " + this.goalNextSteps + "\n")
        }

      createNewGoalInFirestore() {        
        console.log("Creating a new goal " + this.goaluid + "for user " + this.useruid + " with the following data:\n");
        this.printAllFieldsToConsole();
        userDoc.collection('goals').doc(this.goaluid).set({
            created: this.created,
            goaluid: this.goaluid,
            useruid: this.useruid,
            goalCategory: this.goalCategory,
            goalDue: this.goalDate,
            goalProgress: this.goalProgress,
            isGoalComplete: this.isGoalComplete,
            goalNextSteps: this.goalNextSteps
          });
        }
        //TODO inspect value of the field 'progress' and update 'isGoalComplete' to True if progress = 100%
      updateExistingGoalInFirestore () {
        let goalDoc = userDoc.collection('goals').doc(this.goaluid);
        console.log("Updating goal " + this.goaluid + "for user " + this.useruid + " with the following data:\n");
        this.printAllFieldsToConsole();
        if (this.goalCategory) {   
          goalDoc.update({goalCategory: this.goalCategory});
        }
        if (this.goalDate) {  
          goalDoc.update({goalDue: this.goalDate});
        }
        if (this.goalProgress) {       
          goalDoc.update({goalProgress: this.goalProgress});
        }
        if (this.isGoalComplete) {       
          goalDoc.update({isGoalComplete: this.isGoalComplete});
          }
        if (this.goalNextSteps) {       
          goalDoc.update({goalNextSteps: this.goalNextSteps});
          }        
      }
  }
  module.exports = Goal;