const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
exports.createUser = functions.firestore
    .document('docs/{ID}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const datetime = newValue.lesson;
      const p = new Date(datetime);
      console.log(p);
    
      // perform desired operations ...
    });

