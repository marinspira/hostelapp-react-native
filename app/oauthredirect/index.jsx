import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import '@/assets/translations/i18n'

function OAuthRedirect() {
    const user = useSelector((state) => state.user.data);

    return (
        <View style={styles.container}>
            <Text>{`Boa 06!!! uhuuuu${user}`}</Text>
        </View>
    );
}

export default OAuthRedirect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});