import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Greetings from '@/components/greetings'
import { useSelector } from 'react-redux';
import { User } from '@/redux/slices/user/interfaces';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'

export default function HostHomeScreen() {

  const { t, i18n } = useTranslation();

  const user = useSelector((state: { user: User }) => state.user)

  return (
    <SafeAreaView>
      <View>
        <ScrollView style={styles.container}>
          <Greetings username={user?.data?.name} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  }
});
