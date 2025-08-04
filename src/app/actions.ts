'use server';

import { redirect } from 'next/navigation';

export async function signInWithGoogleAction() {
  // This is no longer used for popup-based sign-in.
  // The client-side handles the entire flow.
  // This could be used for other server-side auth logic in the future.
  redirect('/dashboard');
}
