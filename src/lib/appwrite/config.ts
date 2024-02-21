import { IAppwriteConfig } from "@/types";
import { Client, Account, Databases } from "appwrite";
import constants from '../../constants';

const { APPWRITE_PROJECT_ID, APPWRITE_ENDPOINT } = constants;

export const appwriteConfig: IAppwriteConfig = {
    projectId: APPWRITE_PROJECT_ID,
    url: APPWRITE_ENDPOINT,
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.url)
    .setProject(appwriteConfig.projectId);


export const account = new Account(client);
export const database = new Databases(client);
