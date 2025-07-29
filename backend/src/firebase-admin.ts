import * as admin from 'firebase-admin';

// 初期化
admin.initializeApp();

/**
 * トークン(JWD)を検証する
 * @param token 
 */
export const verifyIdToken = (token: string) =>
  admin.auth().verifyIdToken(token);