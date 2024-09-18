import { db } from "./firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
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
    try {
      const docRef = doc(this.collectionRef, id);
      console.log("docRef", docRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("docSnap", docSnap);
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document by ID:", error);
      throw error;
    }
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

  async create(id, data) {
    if (data.createAt instanceof Date) {
      data.createAt = Timestamp.fromDate(data.createAt);
    }
    if (data.updatedAt instanceof Date) {
      data.updatedAt = Timestamp.fromDate(data.updatedAt);
    }
    console.log("data", data);
    await setDoc(doc(this.collectionRef, id), data);
    console.log("Document written with ID: ", id);
    return id;
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
