class User {
    constructor() {
        this.uid = '';
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