import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    getDoc,
    doc,
    updateDoc,
    setDoc,
    addDoc,
    getDocs,
    collection,
    query, 
    where,
    orderBy,
} from "firebase/firestore";
import { getUserGeoLocation } from "../utils/utils";
  
const firebaseConfig = {
    apiKey: "AIzaSyCcohjeaTZ0bECAGXWy0q5NlOUUi_VNrgU",
    authDomain: "treehacks-910bd.firebaseapp.com",
    projectId: "treehacks-910bd",
    storageBucket: "treehacks-910bd.appspot.com",
    messagingSenderId: "755548902592",
    appId: "1:755548902592:web:c0c060c6920dcc5bf88925",
    measurementId: "G-3ZLGN94K5E"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmailAndPassword = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
};

export const getToDoList = async (email) => {
    try {
        const docSnap = await getDoc(doc(db, "to-do", email));

        return docSnap.data().items;
    } catch (error) {
        console.error(error);
    }
};

export const addToDoItem = async (currentItems, email, newItem) => {
    await updateDoc(doc(db, "to-do", email), {
        items: [...currentItems, newItem],
    });
};



export const deleteToDoItem = async (currentItems, email, deleteItem) => {
    var newItems = currentItems;
    
    const index = newItems.indexOf(deleteItem);

    if (index > -1) {
        newItems.splice(index, 1);
    }

    await updateDoc(doc(db, "to-do", email), {
        items: [...newItems],
    });
};

export const getMatches = async (currentUser) => {
    try {
        const newUserRequest = currentUser;
        const matchRequestsRef = collection(db, "matchRequests");
         // Fetch all user requests
        const snapshot = await matchRequestsRef.get();
        let matches = [];
        if (snapshot.length > 0) {
            snapshot.forEach(doc => {
            const existingUserRequest = doc.data();
            const distance = calculateDistance(newUserRequest.location, existingUserRequest.location);
            const commonCategories = newUserRequest.foodCategories.filter(category => existingUserRequest.foodCategories.includes(category));
            const priceDifference = Math.abs(priceToInt(newUserRequest.price) - priceToInt(existingUserRequest.price));
    
            matches.push({
                ...existingUserRequest,
                distance,
                commonCategories: commonCategories.length,
                priceDifference
            });
            });
    
            // Sort matches by distance, common food categories, and price difference
            matches.sort((a, b) => {
            if (a.distance !== b.distance) return a.distance - b.distance;
            if (a.commonCategories !== b.commonCategories) return b.commonCategories - a.commonCategories;
            return a.priceDifference - b.priceDifference;
            });
        }
        
        currentUser.location = await getUserGeoLocation();
        await addDoc(matchRequestsRef, currentUser);
        return matches;
    } catch (error) {
        console.error("Error getting matches:", error);
        return [];
    }
};

function calculateDistance(coord1, coord2) {
    // Implement distance calculation using latitudes and longitudes
    // named toRadians which converts from
    // degrees to radians.
    var lon1 = coord1.longitude
    var lon2 = coord2.longitude
    var lat1 = coord1.latitude
    var lat2 = coord2.latitude
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula 
    let dlon = lon2 - lon1; 
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.pow(Math.sin(dlon / 2),2);
            
    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956 
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);
};
  
function priceToInt(price) {
    if (price === '$') return 1;
    if (price === '$$') return 2;
    if (price === '$$$') return 3;
    return 4; // Default case
};