import { app, initAnalytics } from "./firebase";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile, } from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc, collection, addDoc, getDocs, query, where, deleteDoc, } from "firebase/firestore";
import { StoreError } from "services";
// Initialize analytics (guarded) but don't block initialization flow.
void initAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const collectionUsers = (id) => doc(db, "users", id);
const collectionFavorites = (id) => collection(db, "users", id, "favorites");
export const userSignUp = async (userData) => {
    const { email, password, name } = userData;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    await setDoc(collectionUsers(user.uid), {
        name: user.displayName,
        email: user.email,
        id: user.uid,
    });
    return {
        name: user.displayName,
        email: user.email,
        id: user.uid,
    };
};
export const userSignIn = async (userData) => {
    const { email, password } = userData;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
        name: user.displayName,
        email: user.email,
        id: user.uid,
    };
};
export const updateUserData = async (userData) => {
    const { email, password, name, theme } = userData;
    if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
        await updateEmail(auth.currentUser, email);
        await updatePassword(auth.currentUser, password);
        await updateDoc(collectionUsers(auth.currentUser.uid), { name, email, theme });
    }
};
export const resetUserPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
};
export const userLogOut = async () => {
    await signOut(auth);
};
export const addFavoriteToStore = async (movieInfo, userId) => {
    const q = query(collectionFavorites(userId), where("imdbID", "==", movieInfo.imdbID));
    const { docs } = await getDocs(q);
    const movie = docs.map((doc) => doc.data());
    if (movie.length) {
        throw new StoreError("store/movie-already-favorite");
    }
    await addDoc(collectionFavorites(userId), {
        ...movieInfo,
    });
};
export const getFavoritesFromStore = async (userId) => {
    const { docs } = await getDocs(collectionFavorites(userId));
    const favorites = docs.map((doc) => doc.data());
    return favorites;
};
export const deleteFavoriteFromStore = async (movieId, userId) => {
    const q = query(collectionFavorites(userId), where("imdbID", "==", movieId));
    const { docs } = await getDocs(q);
    const ref = docs.map((doc) => doc.ref);
    await deleteDoc(ref[0]);
};
