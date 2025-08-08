'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD5zJ6h3_4fOMxYDBFR4myriilT6SPFn_U',
  authDomain: 'neonvid-balic.firebaseapp.com',
  projectId: 'neonvid-balic',
  storageBucket: 'neonvid-balic.appspot.com',
  messagingSenderId: '167301694737',
  appId: '1:167301694737:web:488457a157255e482bb8b0',
  measurementId: 'G-XXXXXXXXXX',
};


// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const signOutGoogle = async (): Promise<void> => {
  await signOut(auth);
};

export { app, auth };
