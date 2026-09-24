const firebaseConfig = {
  apiKey: "AIzaSyD2KyYpPVVzbcxTCHE9jJIejVsb9XH1Utw",
  authDomain: "teste-senai-8567a.firebaseapp.com",
  projectId: "teste-senai-8567a",
  storageBucket: "teste-senai-8567a.firebasestorage.app",
  messagingSenderId: "510389258109",
  appId: "1:510389258109:web:b40e03ad9e6b221c58ae14"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

async function addData() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  try {
    const docRef = await db.collection('users').add({
      name: name,
      age: Number.parseInt(age, 10)
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

async function getData() {
  try {
    const querySnapshot = await db.collection('users').get();
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name}, ${data.age}`;
      dataList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

window.addData = addData;
window.getData = getData;
