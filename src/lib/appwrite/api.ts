import { ID } from "appwrite";
import { ILogInUser, INewUser } from "@/types";
import { account } from "./config";
import { logIn } from "../redux/auth/authSlice";
import { createErrorToast } from "@/utils/utils";

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
  account.createEmailSession(user.email, user.password);
}

export async function logOutUser() {
  account.deleteSession("current");
}

export async function isLoggedIn() {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
}
