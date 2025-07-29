import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./lib/firebase";
import { apiFetch } from "./lib/api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // ① リスナー登録して、変更を監視
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);// ② 認証状態が変わったら state を更新
    });
    // ③ クリーンアップ：コンポーネントが消えたらリスナー解除
    return () => unsub();
  }, []);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password).catch(console.error);
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).catch(console.error);
  };

  const logout = () => {
    signOut(auth);
  };

  const getHello = async () => {
    const {data} = await apiFetch<{data: string}>("/hello")
    console.log("message:", data)
  }

  return (
    <div style={{ padding: "2rem" }}>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <div style={{ marginTop: "1rem" }}>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
          </div>
        </>
      )}
      <button onClick={getHello}>Get Hello</button>
    </div>
  );
}

export default App;
