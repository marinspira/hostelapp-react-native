import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Greetings from '@/components/guest/greetings'
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/slices/user/interfaces';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'

export default function HostHomeScreen() {

  const { t, i18n } = useTranslation();

  const user = useSelector((state: { user: UserState }) => state.user)

  return (
    <SafeAreaView>
      <View>
        <ScrollView style={styles.container}>
          <Greetings user={user} />
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
