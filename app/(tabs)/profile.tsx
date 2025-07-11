import {View, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import {account} from "@/lib/appwrite";
import {router} from "expo-router";

const Profile = () => {
    const handleLogout = async () => {
        await account.deleteSession("current")
        router.push("/sign-in")
    }

    return (
        <SafeAreaView className="flex items-end justify-center h-full">
            <CustomButton title="Logout" onPress={handleLogout}/>
        </SafeAreaView>
    )
}
export default Profile
