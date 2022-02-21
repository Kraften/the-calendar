import { ref, set, get, child, getDatabase, onValue } from 'firebase/database';
import { db, dbFirestore } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
const EVENTS_DB_REF = collection(dbFirestore, 'events');
class FirebaseEventsService {
    /**
     * Saves a new event to the Firebase DB.
     */
    saveNewEvent = async (event) => {
        try {
            const docRef = await addDoc(EVENTS_DB_REF, event);
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    getAll = async () => {
        return await getDocs(EVENTS_DB_REF);
    };
}

export default new FirebaseEventsService();
