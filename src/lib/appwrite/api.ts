import { ID, Query } from "appwrite";
import { ILogInUser, INewUser, TodoItem, TodoItemsList } from "@/types";
import { account, database } from "./config";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

/**
 * Creates a user account.
 *
 * @param user - The user object containing the user's information.
 * @returns A promise that resolves to the newly created account.
 */
export async function createUserAccount(user: INewUser) {
  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name
  );
  return newAccount;
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

export async function addTodoTask(
  email: string,
  todo: string
): Promise<TodoItem> {
  const response = await database.createDocument(
    import.meta.env.VITE_APPWRITE_DB_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    "unique()",
    {
      email: email,
      todo: todo,
    }
  );
  return {
    email: email,
    todo: todo,
    $id: response.$id,
    $createdAt: response.$createdAt,
    isCompleted: response.isCompleted,
  };
}

export async function getTodosList(email: string): Promise<TodoItemsList> {
  const response = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_DB_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    [Query.equal("email", email)]
  );
  return response.documents.reduce((obj: TodoItemsList, doc) => {
    obj[doc.$id] = {
      email: doc.email,
      todo: doc.todo,
      $id: doc.$id,
      $createdAt: doc.$createdAt,
      isCompleted: doc.isCompleted,
    };
    return obj;
  }, {});
}

export async function updateTodosList(
  id: string,
  isCompleted: boolean
): Promise<TodoItemsList> {
  const response = await database.updateDocument(
    import.meta.env.VITE_APPWRITE_DB_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    id,
    { isCompleted: isCompleted }
  );
  return {
    [response.$id]: {
      email: response.email,
      todo: response.todo,
      $id: response.$id,
      $createdAt: response.$createdAt,
      isCompleted: response.isCompleted,
    },
  };
}

export async function deleteTodoFromList(id: string) {
  await database.deleteDocument(
    import.meta.env.VITE_APPWRITE_DB_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    id
  );
}

export async function createEmailVerification() {
  try {
    await account.createVerification("http://localhost:5173/verified");
    createSuccessToast("The message has been send! Please check your email.", 10000)
  } catch(error) {
    if(error instanceof Error) {
      createErrorToast(error.message)
    }
    console.error(error);
  }
}

export async function verifyUserEmail(secret: string, userId: string) {
  await account.updateVerification(userId, secret);
}