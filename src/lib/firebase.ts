'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, Auth, User } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'neonvid-balic',
  appId: '1:167301694737:web:488457a157255e482bb8b0',
  storageBucket: 'neonvid-balic.firebasestorage.app',
  apiKey: 'AIzaSyCAp-Y3p7HukJ9T9tV1MievdOmdpJIfWN8',
  authDomain: 'neonvid-balic.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '167301694737',
};


// Initialize Firebase
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

export const signOutGoogle = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error;
  }
};

export { app, auth };
