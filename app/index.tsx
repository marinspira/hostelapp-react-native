import { Redirect } from 'expo-router';
import { useStorageState } from '@/hooks/useStorageState';
import { User } from '@/redux/slices/user/interfaces';

export default function Index() {
  const [[loading, storedUser]] = useStorageState('user');
  const user = storedUser ? (JSON.parse(storedUser) as User) : null;

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

  return <Redirect href="/guest/(screens)/checkin" />;
}
