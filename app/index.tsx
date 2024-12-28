import { Redirect, router, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Index() {
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    console.log('Index Component - User State:', user);
  }, [user]);

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
        return <Redirect href="/host/(screens)/register" />;
      }
      return <Redirect href="/host/(tabs)" />;
    }
  }
}
