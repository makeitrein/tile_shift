import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/database";

const CLIENT_CONFIG = {
  apiKey: "AIzaSyCc09tT1QK-fz7L-OPM4lvvFJHOtvHlaXI",
  authDomain: "tileshift-d88e7.firebaseapp.com",
  projectId: "tileshift-d88e7",
  storageBucket: "tileshift-d88e7.appspot.com",
  messagingSenderId: "830263281812",
  appId: "1:830263281812:web:bda6db51fa3000c9778c81",
  measurementId: "G-L0TV6RQZL0",
};

if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  if (typeof window !== "undefined") {
    firebaseClient
      .auth()
      .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  }
}

const db = firebaseClient.database();
export { firebaseClient, db };
