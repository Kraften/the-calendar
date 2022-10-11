import { query } from 'firebase/database';
import { db } from '../firebase/firebase';
import {
  collection,
  addDoc,
  where,
  deleteDoc,
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

class FirebaseEventsService {
  /**
   * Saves a new event to the Firebase DB.
   * @returns Promise
   */
  saveNewEvent = async (event) => {
    const eventWithId = {
      ...event,
      id: uuidv4()
    };
    try {
      const eventsCollection = collection(db, 'events');
      const docRef = await addDoc(eventsCollection, eventWithId);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  /**
   * Firebase query that fetches all events.
   * @returns Unsubscribe
   */
  getAllQuery = (snapshot, error) => {
    const itemsColRef = collection(db, 'events');
    const itemsQuery = query(itemsColRef);
    return onSnapshot(itemsQuery, snapshot, error);
  };

  /**
   * Deletes event by provided id Firebase db.
   * @param {*} id String
   */
  deleteEventById = async (id) => {
    if (id) {
      const eventsCollection = collection(db, 'events');
      const selectEventByIdQuery = query(
        eventsCollection,
        where('id', '==', id)
      );
      const querySnapshot = await getDocs(selectEventByIdQuery);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
        console.log(doc.id, ' => ', doc.data());
      });
    }
  };
}

export default new FirebaseEventsService();
