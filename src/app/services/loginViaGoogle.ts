import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { get, set } from "firebase/database";
import { app, dbRef } from "./getApp";

export default (callback: (login: string) => void) => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()
    auth.languageCode = 'ru';

    signInWithPopup(auth, provider).then(res => {
        const email = res.user.email
        const login = email.split('@')[0]
        const ref = dbRef(`users/${login}/`)
        get(ref).then(snap => {
            if (!snap.val()){
                set(ref, {email: email}).then(() => {
                    callback(login)
                })
            } else {
                callback(login)
            }
        })
    })
}