import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Firestore imports
import {
  getFirestore,
  // Allows us to retrieve documents in our firestore database
  doc,
  // Allows us to get and set docs' data (doc just allow us to get the docs themselves)
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8qaaBuXT4ftcm8uJxvY77HU--BNrXd8c",
  authDomain: "crwn-new-3b856.firebaseapp.com",
  projectId: "crwn-new-3b856",
  storageBucket: "crwn-new-3b856.appspot.com",
  messagingSenderId: "884354652569",
  appId: "1:884354652569:web:d5bf8b93c82109743bdb08",
  measurementId: "G-ET9GM9RE94",
};

const firebaseApp = initializeApp(firebaseConfig);

// Google Auth Provider setup
// Instantiate new Google Auth Provider class
const googleProvider = new GoogleAuthProvider();
// Set custom parameters on the Google Auth Provider, always prompt user to select an account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Google sign in with redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Instantiation of our database, allows us to interact with it
export const db = getFirestore();

// Store authed user in database as a user document
// It takes the auth object we get back from firebase auth as an argument
// Take data we get from firebase auth and store it in firestore

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Check to see if a user with this info already exists (see if there is existing document reference)
  // doc() takes three args: the database, the collection (as a string), then an identifier
  // We get the uid from the userauth object
  // Even though we don't have a document reference inside our db, Google still
  // generates this object that points to a now unique point in the database.
  // We can use this to set data there since it already points to some place.

  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  // Now we use getDoc to actually see if there is data at that location.
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    // Get properties we want from auth object and new Date to create new user document in firestore
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // Try/catch block to store user (bc asynchronous and we want to catch errors)
    try {
      // Try setDoc, passing it the user doc reference and the data
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });

      
    } catch (error) {
      console.log("There was an error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
};
