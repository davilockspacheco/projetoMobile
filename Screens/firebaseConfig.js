import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCavQVv9pq8YJdDpa64piy1RfRyTA-4kX4",
  authDomain: "mobile3190-davi.firebaseapp.com",
  projectId: "mobile3190-davi",
  storageBucket:"mobile3190-davi.firebasestorage.app",
  messagingSenderId: "11327297580",
  appId: "1:11327297580:web:160c73f6db3daa18c6d989"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };