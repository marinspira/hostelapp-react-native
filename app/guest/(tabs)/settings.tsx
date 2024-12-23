import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '@/assets/translations/i18n'
import { User } from '@/redux/slices/user/interfaces';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoutButton from '@/components/logout'

export default function Settings() {

  const { t, i18n } = useTranslation();

  const user = useSelector((state: { user: User }) => state.user)
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View>
          <View>
            <Image source={{ uri: user.picture }} />
          </View>
          <LogoutButton/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
