import { ID, Query } from "appwrite";
import { ILogInUser, INewUser, todoItem } from "@/types";
import { account, database } from "./config";
import { logIn } from "../redux/auth/authSlice";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

/**
 * Creates a user account.
 *
 * @param user - The user object containing the user's information.
 * @returns A promise that resolves to the newly created account.
 */
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    logIn({ email: user.email, password: user.password });
    return newAccount;
  } catch (error) {
    if (error instanceof Error) {
      createErrorToast(error.message);
      console.error(error);
    }
    console.error(error);
  }
}

export async function logInUser(user: ILogInUser) {
  await account.createEmailSession(user.email, user.password);
}

export async function logOutUser() {
  await account.deleteSession("current");
}

/**
 * Checks if the user is currently logged in.
 * @returns {Promise<boolean>} A promise that resolves to true if the user is logged in, or false if not.
 */
export async function isLoggedIn(): Promise<boolean> {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
}

export async function addTodo(email: string, todo: string) {
  try {
    await database.createDocument(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      "unique()",
      {
        email: email,
        todo: todo,
      }
    );
    createSuccessToast("The task has been successfully added!");
  } catch (error) {
    if (error instanceof Error) {
      createErrorToast(error.message);
      console.log(await account.get());
    } else {
      createErrorToast();
    }
    console.log(error);
  }
}

export async function getTodosList(email: string): Promise<todoItem[]> {
  const response = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_DB_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    [Query.equal("email", email)]
  );
  return response.documents as unknown as todoItem[];
}
