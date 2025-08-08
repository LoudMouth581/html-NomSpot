import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, View, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, addDoc, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [entry, setEntry] = useState(""); const [entries, setEntries] = useState([]);

  const login = () => signInWithEmailAndPassword(auth, email, password);
  const signup = () => createUserWithEmailAndPassword(auth, email, password);

  const saveEntry = async () => {
    await addDoc(collection(db, "entries"), {
      uid: user.uid,
      text: entry,
      date: new Date().toISOString()
    });
    setEntry(""); fetchEntries();
  };

  const fetchEntries = async () => {
    const q = query(collection(db, "entries"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    setEntries(snapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    onAuthStateChanged(auth, u => {
      setUser(u);
      if (u) fetchEntries();
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {!user ? (
        <>
          <TextInput placeholder="Email" onChangeText={setEmail} style={{ marginBottom: 10 }} />
          <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
          <Button title="Login" onPress={login} />
          <Button title="Sign Up" onPress={signup} />
        </>
      ) : (
        <>
          <TextInput placeholder="New entry..." value={entry} onChangeText={setEntry} />
          <Button title="Save Entry" onPress={saveEntry} />
          <FlatList
            data={entries}
            renderItem={({ item }) => <Text>{item.date}: {item.text}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
}
