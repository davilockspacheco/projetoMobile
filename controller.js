import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCavQVv9pq8YJdDpa64piy1RfRyTA-4kX4",
  authDomain: "mobile3190-davi.firebaseapp.com",
  projectId: "mobile3190-davi",
  storageBucket: "mobile3190-davi.firebasestorage.app",
  messagingSenderId: "11327297580",
  appId: "1:11327297580:web:160c73f6db3daa18c6d989"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define persistência em memória para evitar erros no react-native-web
setPersistence(auth, inMemoryPersistence)
  .catch((error) => {
    console.error("Erro ao definir persistência:", error.message);
  });

export { auth };
export const db = getFirestore(app);
