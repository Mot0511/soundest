import { GoogleAuthProvider, getAuth, signInWithPopup, setPersistence, browserLocalPersistence, signInWithRedirect, getRedirectResult} from "firebase/auth";
import { get, set } from "firebase/database";
import { supabase } from "./supabase";

export default async (callback: () => void) => {

    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000'
            // redirectTo: 'https://dkwzyarpuwowkvmyltqw.supabase.co/auth/v1/callback'
        }
    })

    // const email = res.user.email
    // const uid = res.user.uid
    // const ref = dbRef(`users/${uid}/`)
    // get(ref).then(snap => {  
    //     if (!snap.val()){
    //         set(ref, {email: email}).then(() => {
    //             callback()
    //         })
    //     } else {
    //         callback()
    //     }
    // })
}