// asyncStorageUtil.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        // console.log('Data saved', key, value);
    } catch (e) {
        console.log('Error saving data', e);
    }
};

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        // console.log('Data fetching', jsonValue);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Error fetching data', e);
    }
};
