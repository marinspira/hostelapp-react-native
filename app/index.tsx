import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/redux/store';
import { isAuthenticated } from '@/src/redux/slices/user';
// import StorybookUI from "@/src/storybook";
import "@/src/utils/logger"

export default function Index() {

  // const [useStorybook] = useState(false);

  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user) {
      console.log('Index. User State:', user);
    }

    const fetchUser = async () => {
      const result = await dispatch(isAuthenticated())
    }
    fetchUser()
  }, [user]);

  // if (useStorybook) {
  //   return <StorybookUI />
  // } else {
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
          return <Redirect href="/host/hostel/create" />;
        }
        return <Redirect href="/host/(tabs)" />;
      }
    }
  // }
}