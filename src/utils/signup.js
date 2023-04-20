import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const register = async ({ email, password, displayName }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(user, { displayName });

    await setDoc(doc(db, "users", user.uid), {
      displayName,
      email: user.email,
      uid: user.uid,
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default register;
