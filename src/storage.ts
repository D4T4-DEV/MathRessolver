import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const isWeb = Platform.OS === 'web';

export const LocalStorage = {

    async save<T>(key: string, value: T): Promise<void> {
        const jsonValue = JSON.stringify(value);
        if (isWeb) {
            localStorage.setItem(key, jsonValue);
        } else {
            await AsyncStorage.setItem(key, jsonValue);
        }
    },

    async load<T>(key: string): Promise<T | null> {

        if (isWeb) {
            const result = localStorage.getItem(key);
            return result ? (JSON.parse(result) as T) : null;
        } else {
            const result = await AsyncStorage.getItem(key);
            return result ? (JSON.parse(result) as T) : null;
        }

    },

    async remove(key: string): Promise<void> {
        if (isWeb) {
            localStorage.removeItem(key);
        } else {
            await AsyncStorage.removeItem(key);
        }

    },

    async clearAll(): Promise<void> {
        if (isWeb) {
            localStorage.clear();
        } else {
            await AsyncStorage.clear();
        }
    }
};