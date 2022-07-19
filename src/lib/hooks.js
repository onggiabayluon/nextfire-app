import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

import { auth, firestore } from "./firebase";

// Từ [google user Object] đâm vào firestore database collection users để tìm document
// bằng uid, có thì setUsername không có thì set là null
// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
