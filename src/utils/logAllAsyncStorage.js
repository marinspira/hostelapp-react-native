import AsyncStorage from '@react-native-async-storage/async-storage';


export const logAllAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);

      console.log("🔍 --- AsyncStorage Dump Start --- 🔍");

      stores.forEach(([key, value]) => {
        console.log(`\nKey: %c${key}`, "color: purple; font-weight: bold");

        try {
          const parsedValue = JSON.parse(value || 'null');
          console.log("Value:", parsedValue);
        } catch (e) {
          console.log("Could not parse JSON, raw value:", value);
        }
      });

      console.log("--- AsyncStorage Dump End ---");

    } catch (error) {
      console.error("❌ Error reading AsyncStorage:", error);
    }
  };