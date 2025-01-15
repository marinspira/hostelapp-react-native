import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getGuest } from '@/redux/slices/guest/slice';
import { isAuthenticated } from '@/redux/slices/user/slice';

export default function Index() {
  const user = useSelector((state: RootState) => state.user.data);

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    console.log('Index. User State:', user);

    fetchUser()
  }, [user]);

  const fetchUser = async () => {
    const result = await dispatch(isAuthenticated())
  }

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
