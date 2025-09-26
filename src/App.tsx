import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./lib/firebase";
import { apiFetch } from "./lib/api";
import { getCurrentUserRole } from "./lib/authHelper";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [targetUid, setTargetUid] = useState<string>("");
  const [targetRole, setTargetRole] = useState<'admin' | 'user'>('user');

  useEffect(() => {
    // ① リスナー登録して、変更を監視
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);// ② 認証状態が変わったら state を更新
      if (user) {
        try {
          const r = await getCurrentUserRole();
          setRole(r);
        } catch (e) {
          console.error(e);
          setRole(undefined);
        }
      } else {
        setRole(undefined);
      }
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

  const getAdminHealth = async () => {
    const res = await apiFetch<{status: string}>("/admin/health");
    console.log("admin health:", res.status);
  }

  const setUserRoleAdmin = async () => {
    if (!targetUid) return alert('Enter target UID');
    const res = await apiFetch<{ ok: true; uid: string; role: 'admin' | 'user' }>(
      `/admin/users/${encodeURIComponent(targetUid)}/role`,
      { method: 'POST', body: { role: targetRole } }
    );
    console.log('role updated:', res);
    alert(`Updated role for ${targetUid} to ${targetRole}`);
  }

  return (
    <div style={{ padding: "2rem" }}>
      {user ? (
        <>
          <p>Welcome, {user.email} {role ? `(role: ${role})` : ''}</p>
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
      {role === 'admin' && (
        <>
          <button style={{ marginLeft: "0.5rem" }} onClick={getAdminHealth}>Admin Health</button>
          <div style={{ marginTop: '1rem', padding: '0.5rem', border: '1px solid #ddd', maxWidth: 480 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Admin: Set User Role</div>
            <input
              placeholder="Target UID"
              value={targetUid}
              onChange={(e) => setTargetUid(e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
            <select value={targetRole} onChange={(e) => setTargetRole(e.target.value as any)}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <button style={{ marginLeft: 8 }} onClick={setUserRoleAdmin}>Apply</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
