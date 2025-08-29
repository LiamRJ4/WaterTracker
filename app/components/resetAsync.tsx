import AsyncStorage from "@react-native-async-storage/async-storage";
import { Router } from "expo-router";

export async function resetAsyncStorage(router: Router) {
   
    try {
        await AsyncStorage.clear();
        router.replace("/")
        console.log("Async Storage Cleared");

    } catch (e) {
        console.error("Failed to clear async storage", e);
    }
};

