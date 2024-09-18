import { db } from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

class FirestoreDAO {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async getAll() {
    const snapshot = await getDocs(this.collectionRef);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  async getById(id) {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  }

  async getByField(field, value) {
    const q = query(this.collectionRef, where(field, "==", value));
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  async create(data) {
    const docRef = await addDoc(this.collectionRef, data);
    return docRef.id;
  }

  async update(id, data) {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, data);
  }

  async delete(id) {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }
}

export default FirestoreDAO;
