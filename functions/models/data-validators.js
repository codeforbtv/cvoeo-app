// TODO look into using an existing library instead:  https://blog.mailtrap.io/react-native-email-validation
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidEmail = (address) => emailRegex.test(address);
module.exports.isValidEmail = isValidEmail;