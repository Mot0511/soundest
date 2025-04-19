import { GoogleAuthProvider, getAuth, signInWithPopup, setPersistence, browserLocalPersistence, signInWithRedirect, getRedirectResult} from "firebase/auth";
import { get, set } from "firebase/database";
import { app, auth, dbRef } from "./firebase";

export default (callback: () => void) => {
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            const provider = new GoogleAuthProvider()
            auth.languageCode = 'ru';

            signInWithPopup(auth, provider).then(res => {
                const email = res.user.email
                const uid = res.user.uid
                const ref = dbRef(`users/${uid}/`)
                get(ref).then(snap => {
                    if (!snap.val()){
                        set(ref, {email: email}).then(() => {
                            callback()
                        })
                    } else {
                        callback()
                    }
                })
            }).catch(e => {
                console.log(e.code)
                console.log(e.message)
            })
        })
        .catch((error: any) => {
            // Handle Errors here.
            console.error(error.message)
        });
}