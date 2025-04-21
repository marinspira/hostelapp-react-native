import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { isAuthenticated } from '@/redux/slices/user/slice';
import StorybookUI from "../storybook";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';

export default function Index() {

  const [useStorybook] = useState(false);

  const user = useSelector((state: RootState) => state.user.data);
  const queryClient = useQueryClient();

  const dispatch = useDispatch<AppDispatch>()

  const logAllAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);

      console.log("🔍 --- AsyncStorage Dump Start --- 🔍");

      stores.forEach(([key, value]) => {
        console.log(`\n📁 Key: %c${key}`, "color: purple; font-weight: bold");

        try {
          const parsedValue = JSON.parse(value || 'null');
          console.log("📦 Value:", parsedValue);
        } catch (e) {
          console.log("⚠️ Could not parse JSON, raw value:", value);
        }
      });

      console.log("✅ --- AsyncStorage Dump End --- ✅");

    } catch (error) {
      console.error("❌ Error reading AsyncStorage:", error);
    }
  };

  const logReactQueryCache = () => {
    const queries = queryClient.getQueryCache().getAll();
  
    console.log("🔍 --- React Query Cache Dump Start --- 🔍");
  
    queries.forEach((query) => {
      const queryKey = query.queryKey;
      const queryData = query.state.data;
  
      console.log(`\n🗝️ Query Key:`, queryKey);
      console.log(`📦 Data:`, queryData);
    });
  
    console.log("✅ --- React Query Cache Dump End --- ✅");
  };

  useEffect(() => {
    console.log('Index. User State:', user);
    // logAllAsyncStorage()
    // logReactQueryCache()

    const fetchUser = async () => {
      const result = await dispatch(isAuthenticated())
    }
    fetchUser()
  }, [user, queryClient]);

  if (useStorybook) {
    return <StorybookUI />
  } else {
    if (!user) {
      return <Redirect href='/public' />
    }

    if (user) {
      if (user.role === 'guest') {
        if (user.isNewUser) {
          return <Redirect href="/guest/(screens)/checkin" />;
        }
        return <Redirect href="/guest/(tabs)" />;
      }

      if (user.role === 'host') {
        if (user.isNewUser) {
          return <Redirect href="/host/(screens)/createHostel" />;
        }
        return <Redirect href="/host/(tabs)" />;
      }
    }
  }
}
