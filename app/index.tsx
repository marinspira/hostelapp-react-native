import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getGuest } from '@/redux/slices/guest/slice';
import { isAuthenticated } from '@/redux/slices/user/slice';
import StorybookUI from "../storybook";

export default function Index() {

  const [useStorybook] = useState(false);

  const user = useSelector((state: RootState) => state.user.data);
  const guest = useSelector((state: RootState) => state.guest.data);

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    console.log('Index. User State:', user);
    console.log('Index. Guest State:', guest);
    const fetchUser = async () => {
      const result = await dispatch(isAuthenticated())
    }
    fetchUser()
  }, [user]);

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
          return <Redirect href="/host/(screens)/register" />;
        }
        return <Redirect href="/host/(tabs)" />;
      }
    }
  }
}
