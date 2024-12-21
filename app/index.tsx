import { Redirect } from 'expo-router';
import { useStorageState } from '@/hooks/useStorageState';

interface User {
  role: 'guest' | 'host';
  name?: string;
}

export default function Index() {
  const [[loading, storedUser], setStoredUser] = useStorageState('user');

  const user = storedUser ? (JSON.parse(storedUser) as User) : null;

  if (loading) {
    return null;
  }

  if (user?.role === 'guest') {
    return <Redirect href="/guest" />;
  } else if (user?.role === 'host') {
    return <Redirect href="/host/(tabs)/index" />;
  }

  return <Redirect href="/publicScreens/welcome" />;
}
