import { Client, Storage } from "appwrite";

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const storage = new Storage(client)