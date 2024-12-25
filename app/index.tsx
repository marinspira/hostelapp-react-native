import { Redirect, router } from 'expo-router';
import { useStorageState } from '@/hooks/useStorageState';
import { User } from '@/redux/slices/user/interfaces';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isAuthenticated } from '@/redux/slices/user/slice';
import { AppDispatch } from '@/redux/store';

export default function Index() {
  const [[loading, storedUser], setStoredUser] = useStorageState('user');
  const user = storedUser ? (JSON.parse(storedUser) as User) : null;

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const result = await dispatch(isAuthenticated()).unwrap();

        if (result) {
          setStoredUser(JSON.stringify(result));
        } else {
          setStoredUser(null);
          router.push('/publicScreens/welcome')
          return
        }
      } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        setStoredUser(null);
        router.push('/publicScreens/welcome')
        return
      }
    };

    if (navigator.onLine) {
      authenticateUser();
    }
  }, [user, dispatch, setStoredUser])

  if (loading) {
    return null;
  }

  if (user) {
    if (user.role === 'guest') {
      if (user.isNewUser) {
        return <Redirect href='/guest/(screens)/checkin' />;
      }
      return <Redirect href="/guest/(tabs)" />;

    } else if (user.role === 'host') {
      if (user.isNewUser) {
        return <Redirect href='/host/(screens)/register' />;
      }
      return <Redirect href="/host/(tabs)" />;
    }
  }

  return <Redirect href="/publicScreens/welcome" />;
}
