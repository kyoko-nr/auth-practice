// src/lib/authHelpers.ts
import { auth } from './firebase';

export async function getIdToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }
  // forceRefresh=false にするとキャッシュされたトークンを返す
  return await user.getIdToken(/* forceRefresh */ false);
}
