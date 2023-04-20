import { usersCollection } from "../firebase";

const GetAll = {
    fetchAllUsers: async () => {
        const snapshot = await usersCollection.get();
        return snapshot.docs.map((doc) => ({
            userId: doc.id,
            ...doc.data(),
        }));
    },
}

export default GetAll;