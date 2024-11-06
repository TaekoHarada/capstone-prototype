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

  // Method to fetch all documents in the collection
  async getAll() {
    const snapshot = await getDocs(this.collectionRef);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  // Method to fetch a document by its ID
  async getById(id) {
    console.log("firebaseDAO getById:", id);
    try {
      const docRef = doc(this.collectionRef, id);
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

  // Method to query documents by a specific field and value
  async getByField(field, value) {
    const q = query(this.collectionRef, where(field, "==", value));
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  }

  // Method to create a new document in the collection
  async create(id, data) {
    if (data.hire_date instanceof Date) {
      data.hire_date = Timestamp.fromDate(data.hire_date); // Convert hire_date to Firestore Timestamp
    }
    if (data.updatedAt instanceof Date) {
      data.updatedAt = Timestamp.fromDate(data.updatedAt); // Convert updatedAt to Firestore Timestamp
    }
    console.log("data", data);
    await setDoc(doc(this.collectionRef, id), data);
    console.log("Document written with ID: ", id);
    return id;
  }

  // Method to update an existing document
  async update(id, data) {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, data);
  }

  // Method to delete a document by its ID
  async delete(id) {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }
}

export default FirestoreDAO;
