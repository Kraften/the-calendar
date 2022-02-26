import { query } from 'firebase/database';
import { dbFirestore } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
            const eventsCollection = collection(dbFirestore, 'events');
            const docRef = await addDoc(eventsCollection, eventWithId);
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };
    /**
     * Firebase query that fetches all events.
     * @returns Query
     */
    getAllQuery = () => {
        const allEventsQuery = query(collection(dbFirestore, 'events'));
        return allEventsQuery;
    };
}

export default new FirebaseEventsService();
