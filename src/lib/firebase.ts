// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase コンソールで作成したプロジェクトの設定値
const firebaseConfig = {
  apiKey: "AIzaSyAnG0KPixuWeG-OsZG4Xzot-M3WeyWYNOU",
  authDomain: "auth-demo-1ca95.firebaseapp.com",
  projectId: "auth-demo-1ca95",
  storageBucket: "auth-demo-1ca95.firebasestorage.app",
  messagingSenderId: "335013872699",
  appId: "1:335013872699:web:b64a82a1ed05a712f0481e",
  measurementId: "G-8JMYZXBM7V"
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);

// Firebase Auth をエクスポート
export const auth = getAuth(app);
