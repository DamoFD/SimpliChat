import { auth } from '../firebase';

const signIn = async ({email, password}) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default signIn;