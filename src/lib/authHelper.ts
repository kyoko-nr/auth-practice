// src/lib/authHelpers.ts
import { auth } from './firebase';
import type { IdTokenResult } from 'firebase/auth';

export async function getIdToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }
  return await user.getIdToken(true);
}

export async function getIdTokenResult(): Promise<IdTokenResult> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }
  return await user.getIdTokenResult(true);
}

export async function getCurrentUserRole(): Promise<string | undefined> {
  const res = await getIdTokenResult();
  // Custom claims are available on res.claims
  return (res.claims as any).role as string | undefined;
}
