import {Alert, Text, View} from 'react-native'
import React, {useState} from 'react'
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: "", email: "", password: ""});

    const submit = async () => {
        if (!form.name || !form.email || !form.password) return Alert.alert("Error", "Please enter valid fields.");

        setIsSubmitting(true);

        try {
            //     Call appwrite Sing up functionality
            Alert.alert("Success", "User signed in successfully.");
            router.replace("/")
        } catch (e: any) {
            Alert.alert("Error", e.message);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
                label="Full Name"
            />
            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
                label="Email"
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
                label="Password"
                secureTextEntry={true}
            />
            <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit}/>

            <View className="flex justify-center flex-row gap-2 mt-5">
                <Text className="base-regular text-gray-100">Already have an Account?</Text>
                <Link href="/sign-in" className="base-bold text-primary">Sign In</Link>
            </View>
        </View>
    )
}
export default SignUp
