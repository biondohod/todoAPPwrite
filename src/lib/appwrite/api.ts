import { ID } from 'appwrite';
import { ILogInUser, INewUser } from "@/types";
import { account } from './config';

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        return newAccount;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function logInUser(user: ILogInUser) {
    try {
        const x = account.createEmailSession(user.email, user.password);
        console.log(x);
    } catch(error) {
        console.error(error);
    }

}