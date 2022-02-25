import {
    ref,
    set,
    get,
    query,
    child,
    getDatabase,
    onValue
} from 'firebase/database';
import { db, dbFirestore } from '../firebase/firebase';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const EVENTS_DB_REF = collection(dbFirestore, 'events');

class FirebaseEventsService {
    /**
     * Saves a new event to the Firebase DB.
     */
    saveNewEvent = async (event) => {
        const eventWithId = {
            ...event,
            id: uuidv4()
        };
        try {
            const docRef = await addDoc(EVENTS_DB_REF, eventWithId);
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    getAllQuery = () => {
        const allEventsQuery = query(collection(dbFirestore, 'events'));
        return allEventsQuery;
    };
}

export default new FirebaseEventsService();
