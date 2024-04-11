import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.error("There was an error in saving your data")
    }
}

export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("There was an error in retrieving your data")
    }
}

export const clearData = async () => {
    try {
      await AsyncStorage.clear()
      console.log('All Data Cleared from AsyncStorage.')
    } catch(e) {
      console.error('There was an error clearing the database')
    }
} 