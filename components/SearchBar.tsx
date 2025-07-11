import {View, Text, TextInput, Platform, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {images} from "@/constants";

const SearchBar = () => {
    const params = useLocalSearchParams<{ query: string }>()
    const [query, setQuery] = useState(params.query);

    const handleSearch = (text: string) => {
        setQuery(text);
        if (!text) router.setParams({query: undefined})
    }

    const handleSubmit = () => {
        if (query?.trim()) router.setParams({query})
    }


    return (
        <View className="searchbar" style={Platform.OS === 'android' ? {elevation: 5, shadowColor: "#878787"} : {}}>
            <TextInput
                className="flex-1 p-5"
                placeholder="Search for pizzas, burgers..."
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#A0A0A0"
                returnKeyType="search"
            />
            <TouchableOpacity className="pr-5" onPress={handleSubmit}>
                <Image source={images.search} className="size-6" resizeMode="contain" tintColor="#5D5F6D"/>
            </TouchableOpacity>
        </View>
    )
}
export default SearchBar
