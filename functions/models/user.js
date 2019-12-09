class User {
    constructor() {
        this.uid = '';  // this corresponds to Outcome Tracker's "System Name ID"
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.dateCreated = Date.now();
    }
    get uid() {
        return this._uid;
    }
    set uid(value) {
        this._uid = value;
      } 
}

module.exports = User;
