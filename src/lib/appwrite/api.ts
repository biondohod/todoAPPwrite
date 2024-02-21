import { ID, Query } from "appwrite";
import { ILogInUser, INewUser, TodoItem, TodoItemsList } from "@/types";
import { account, database } from "./config";
import { createErrorToast, createSuccessToast } from "@/utils/utils";
import constants from '../../constants';

const { EMAIL_VERIFICATION_URL, APPWRITE_DB_ID, APPWRITE_COLLECTION_ID } = constants;
/**
 * Creates a new user account.
 * @param user - The user object containing the user's information.
 * @returns The newly created user account.
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

/**
 * Logs in a user with the provided email and password.
 * @param user - The user object containing the email and password.
 * @returns A promise that resolves when the user is successfully logged in.
 */
export async function logInUser(user: ILogInUser) {
  await account.createEmailSession(user.email, user.password);
}

/**
 * Logs out the current user by deleting the session.
 */
export async function logOutUser() {
  await account.deleteSession("current");
}

/**
 * Creates an email verification for the current user.
 * @returns A Promise that resolves when the email verification is created.
 */
export async function createEmailVerification() {
  try {
    await account.createVerification(`${EMAIL_VERIFICATION_URL}verified`);
    createSuccessToast(
      "The message has been sent! Please check your email.",
      10000
    );
  } catch (error) {
    if (error instanceof Error) {
      createErrorToast(error.message);
    }
    console.error(error);
  }
}

/**
 * Verifies the user's email by updating the verification status in the account.
 * @param secret - The secret code for email verification.
 * @param userId - The ID of the user whose email is being verified.
 */
export async function verifyUserEmail(secret: string, userId: string) {
  await account.updateVerification(userId, secret);
}


/**
 * Checks if the user is currently logged in.
 * @returns A Promise that resolves to a boolean indicating whether the user is logged in or not.
 */
export async function isLoggedIn(): Promise<boolean> {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Adds a new todo task for a specific user.
 *
 * @param email - The email of the user.
 * @param todo - The todo task to be added.
 * @returns A Promise that resolves to a TodoItem object representing the added task.
 */
export async function addTodoTask(
  email: string,
  todo: string
): Promise<TodoItem> {
  const response = await database.createDocument(
    APPWRITE_DB_ID,
    APPWRITE_COLLECTION_ID,
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

/**
 * Retrieves a list of todo items for a given email.
 * @param email - The email of the user.
 * @returns A promise that resolves to a TodoItemsList object.
 */
export async function getTodosList(email: string): Promise<TodoItemsList> {
  const response = await database.listDocuments(
    APPWRITE_DB_ID,
    APPWRITE_COLLECTION_ID,
    [Query.equal("email", email)]
  );

  return response.documents.reduce((obj: TodoItemsList, doc) => {
    const { email, todo, $id, $createdAt, isCompleted } = doc;
    obj[$id] = { email, todo, $id, $createdAt, isCompleted };
    return obj;
  }, {});
}

/**
 * Updates a todo item in the database.
 * 
 * @param id - The ID of the todo item to update.
 * @param isCompleted - The new completion status of the todo item.
 * @returns A Promise that resolves to the updated todo item.
 */
export async function updateTodosList(
  id: string,
  isCompleted: boolean
): Promise<TodoItemsList> {
  const response = await database.updateDocument(
    APPWRITE_DB_ID,
    APPWRITE_COLLECTION_ID,
    id,
    { isCompleted }
  );
  const { email, todo, $id, $createdAt, isCompleted: updatedIsCompleted } = response;
  return {
    [$id]: { email, todo, $id, $createdAt, isCompleted: updatedIsCompleted },
  };
}

/**
 * Deletes a todo from the list.
 * @param id - The ID of the todo to delete.
 * @returns A promise that resolves when the todo is successfully deleted.
 */
export async function deleteTodoFromList(id: string) {
  await database.deleteDocument(
    APPWRITE_DB_ID,
    APPWRITE_COLLECTION_ID,
    id
  );
}

