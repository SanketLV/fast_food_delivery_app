import {Account, Avatars, Client, Databases, Storage, ID, Query} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
    menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
    customizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID!,
    menuCustomizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID!
}

export const client = new Client()

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({name, email, password}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if (!newAccount) throw new Error("Failed to create account");

        await signIn({email, password})

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl,
            }
        )
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw new Error("Failed to get account");

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw new Error("Failed to get current user");

        return currentUser.documents[0];
    } catch (e) {
        console.error(e);
        throw new Error(e as string);
    }
}

export const getMenu = async ({category, query}: GetMenuParams) => {
    try {
        const queries: string[] = []

        if (category) queries.push(Query.equal('categories', category))
        if (query) queries.push(Query.equal('name', query))

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )

        return menus.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        )

        return categories.documents;
    } catch (e) {
        throw new Error(e as string);
    }
}