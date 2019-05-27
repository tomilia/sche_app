import firebase from 'firebase'
// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'forregistration-cefe1' })
  .firestore()

// Export types that exists in Firestore

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })
