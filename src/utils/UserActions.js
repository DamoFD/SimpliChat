import { usersCollection } from '../firebase'

const UserActions = {
    updateUser: async (userId, data) => {
        try {
            const userRef = usersCollection.doc(userId);
            await userRef.update(data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    },
}

export default UserActions;