[![Code Climate](https://codeclimate.com/github/codeforbtv/cvoeo-app/badges/gpa.svg)](https://codeclimate.com/github/codeforbtv/cvoeo-app)

# Money On My Mind
## A Code for BTV App with sponsorship by CVOEO

## Local Environment Setup

### Requirements
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [node.js & npm](https://www.npmjs.com/get-npm)
- [expo](expo.io)
  - install expo on your computer using npm: `sudo npm install expo-cli --global`


### Clone the Repo
Get a copy of the app code using the command line: 

`$ cd [desired directory]`

`$ git clone https://github.com/codeforbtv/cvoeo-app.git`

### Run the App
- Run the npm instalation on the cvoeo-app project `$ npm install` 
- Confirm expo can run the project by typing `$ expo start`

### Setup Firebase
You need to create a free Firebase project at Google.
- visit https://console.firebase.google.com/
- Login
- Click "Add project"
- In the console, locate the gear icon next to the "Project Overview" header in the accordian panel on the left. A small pop-up will show with options for "Project Settings" and "Users and Permissions"... click "Project Settings"
- Open the local project file `data-sources/firebase-config.js` - we need to update the 6 properties within to point to your version of the Firebase database.
    - *apiKey*: is the Web API Key in the Firebase Console project settings
    - *projectId*: is the Project ID in the Firebase Console project settings
    - *messageSenderId*: at the top of the settings page switch to the "Cloud Messaging" section. You will see "Sender ID" there.
    - *authDomain*: in the left accordian-panel, under the "Project Overview" is the "Develop" section. Within that, click the "Authentication" section. Once that is open, at the top of the page, switch to the "Sign-in method". Halfway down that page is the "Authorized domains" listing... the value we want is the one that ends in `firebaseapp.com`
    - *databaseURL*: in the left accordian-panel, in the "Database" section under the "Develop" heading, at the top of the database screen click the drop-down listed as "Cloud Firestore" and select "Realtime Database" instead. The Database URL is listed at the top of the "Data" window and looks like <something>.firebaseio.com
    - *storageBucket*: in the left accordian-panel, select "Storage" under the "Develop" heading. The Storage page, Files section shows the url of the storage bucket as gs://<something>.appspot.com.

#### View in Expo Mobile App
By using the expo mobile app, you will be able to test the app in both iOS & Android.  However, you will need a smart phone that can connect to the same network as the computer running expo.

- Download the Expo app on your phone
- Run expo with `$ expo start`
- Create an expo account at https://expo.io/signup
- Open the expo

#### View in Android Emulator
- Download and install [genymotion](https://www.genymotion.com/fun-zone/)
- Genymotion requires a virtualization tool so download [Virtualbox too](https://www.virtualbox.org/wiki/Downloads)
- Open genymotion (order is important here)
- Next run expo `$ expo start`
- On the expo webpage that comes up, click "Run on Android Device/Emulator"

Expo should be able to detect Genymotion and open an emulator for you.

#### View in iOS Emulator
Sadly, you must have a mac to run the iOS emulator.  If you're on a Windows machine, try using the expo mobile app to 

- Open Xcode if you haven’t done so already (you can get xCode through the App Store)
- Choose the Xcode menu, then choose Developer Tools and select “Simulator” to launch iOS Simulator
- Set the simulator on the commandline `$ sudo xcode-select -s /Applications/Xcode.app` (you only need to do this once)
- Run expo `$ expo start`
- In the browser window that expo opens, choose "Run on iOS Simulator" from the left sidebar

## Running Tests
There is a script defined in package.json that allows you to run the tests as follows from the project root:

`$ npm test`
