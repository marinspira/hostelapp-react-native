import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { isAuthenticated } from '@/src/redux/slices/user';
import "@/src/utils/logger"
import { Text } from 'react-native';

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.data);
  const loading = useSelector((state: RootState) => state.user.loading);
  
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(isAuthenticated());
      setCheckedAuth(true);
    };

    checkAuth();
  }, []);

  if (!checkedAuth || loading) {
    return <Text>Loading...</Text>
  }

  if (!user) {
    return <Redirect href="/public" />;
  }

  if (user.role === 'guest') {
    return user.isNewUser 
      ? <Redirect href="/guest/(screens)/checkin" />
      : <Redirect href="/guest/(tabs)" />;
  }

  if (user.role === 'host') {
    return user.isNewUser 
      ? <Redirect href="/host/hostel/create" />
      : <Redirect href="/host/(tabs)" />;
  }

  return null;
}