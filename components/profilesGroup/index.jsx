import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfilesGroup = ({ people }) => {
  const maxVisible = 3; // Número máximo de ícones visíveis
  const extraCount = people.length - maxVisible;

  return (
    <View style={styles.container}>
      {people.slice(0, maxVisible).map((person, index) => (
        <View key={index} style={styles.avatarContainer}>
          <Image source={person.avatar} style={styles.avatar} />
        </View>
      ))}
      {extraCount > 0 && (
        <View style={[styles.avatarContainer, styles.extraContainer]}>
          <Text style={styles.extraText}>+{extraCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginHorizontal: -6,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  extraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  extraText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfilesGroup;
