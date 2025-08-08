// Firebase Setup
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Auth Functions
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signed up!"))
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Logged in!"))
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => alert("Logged out."));
}

// Save Entry
function saveEntry() {
  const text = document.getElementById("entryText").value;
  const date = document.getElementById("entryDate").value;
  const isPublic = document.getElementById("isPublic").checked;
  const uid = auth.currentUser.uid;

  db.collection("entries").add({
    uid,
    text,
    date,
    isPublic,
    timestamp: new Date()
  }).then(() => {
    alert("Saved!");
    document.getElementById("entryText").value = "";
    loadEntries();
    loadPublicFeed();
  });
}

// Load Private Entries
function loadEntries() {
  const uid = auth.currentUser.uid;
  db.collection("entries").where("uid", "==", uid).orderBy("date", "desc").get()
    .then(snapshot => {
      const list = document.getElementById("entryList");
      list.innerHTML = "";
      snapshot.forEach(doc => {
        const item = document.createElement("li");
        item.textContent = `${doc.data().date}: ${doc.data().text}`;
        list.appendChild(item);
      });
    });
}

// Load Public Feed
function loadPublicFeed() {
  db.collection("entries").where("isPublic", "==", true).orderBy("timestamp", "desc").limit(10).get()
    .then(snapshot => {
      const list = document.getElementById("publicFeedList");
      list.innerHTML = "";
      snapshot.forEach(doc => {
        const item = document.createElement("li");
        item.textContent = `${doc.data().date}: ${doc.data().text}`;
        list.appendChild(item);
      });
    });
}

// Auth State Listener
auth.onAuthStateChanged(user => {
  const loggedIn = !!user;
  document.getElementById("entry-section").classList.toggle("hidden", !loggedIn);
  document.getElementById("journal-section").classList.toggle("hidden", !loggedIn);
  if (loggedIn) {
    loadEntries();
  }
  loadPublicFeed();
});
