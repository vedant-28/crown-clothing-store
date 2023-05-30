// Firebase is a suite of tool & Firestore DB is a toll in suite; which we need to get from a library "app".
// This makes sure running of Firebase & it's internal services.
// "initializeApp" => creates an instance of "app" based on configs.
// configs is an object which allows us to attach firebase app instance to our online instance (firebase console).
// config tells app that it needs to attach instance crated here locally needs to be refering to the one which is created in firebase console, online.
import { initializeApp } from "firebase/app";
import {
  getAuth,// to get an instance of "auth" lib, provided for auth related services in firebase
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,// class which provides auth services by Google
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAjPomO5p9i1J2D_PauppoKKwRiQZpZH4",
  authDomain: "crown-clothing-db-495b3.firebaseapp.com", // firebase db instance
  projectId: "crown-clothing-db-495b3",
  storageBucket: "crown-clothing-db-495b3.appspot.com",
  messagingSenderId: "128906749124",
  appId: "1:128906749124:web:523b9f0eebeac8c9375591",
};

// Initialize Firebase using SDK
// (library itself which is JS lib, which abstracts some functionality which is needed to interacts w/firebase instance, essentially doing CRUD ops & Auth)
const firebaseApp = initializeApp(firebaseConfig);

// behavior: Whenever someone interatcs w/provider, we want them to force to select an account (specific to Google OAuth).
// We can generate multiple providers by which we can do multiple things at a time.
const provider = new GoogleAuthProvider();// connected to Google's Firebase OAuth implementation.
provider.setCustomParameters({
    // setCustomParameters takes "config" object as param, by which we can define how do we want Google OAuth to behave.
    prompt: "select_account",
});

// We may need multiple auth providers, but we don't need multiple "auth"s. Auth is a singleton entity.
// e.g. There can be multiple buttons to auth providers (GoogleAuth, Facebook Auth, Github Auth); some may show a popup (signInWithPopup) & some of them may do an auth by redirecting (signInWithRedirect) 
// but the "authentication" they provide will always be same & singleton for an user
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);// Authenticates a Firebase client using a popup-based OAuth authentication flow.
    
