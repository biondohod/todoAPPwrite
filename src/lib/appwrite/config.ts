import { IAppwriteConfig } from "@/types";
import { Client, Account } from "appwrite";

export const appwriteConfig: IAppwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_ENDPOINT,
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);