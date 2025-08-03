'use server';

import { redirect } from 'next/navigation';

export async function signInWithGoogleAction() {
  // This action is now primarily for server-side logic after a successful
  // client-side login. The client will handle the redirect.
  // We can add logic here to create a session, save user data to a DB, etc.
  // For now, we'll just redirect as the client will already be authenticated.
  redirect('/dashboard');
}
