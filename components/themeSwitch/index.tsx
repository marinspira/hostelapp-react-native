import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/slices/theme/slice';
import { RootState } from '@/redux/store';
import { Colors, Theme } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const theme: Theme = useSelector((state: RootState) => state.theme.theme) as Theme;
  const isDarkMode = theme === 'dark';

  const color = Colors[theme];

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <Feather
        name="sun"
        size={24}
        color={isDarkMode ? Colors.light.icon : Colors.dark.tint}
        style={styles.icon}
      />
      <Switch
        value={isDarkMode}
        onValueChange={handleToggle}
        thumbColor={isDarkMode ? Colors.dark.tint : Colors.light.tint}
        trackColor={{ false: '#ccc', true: '#fff' }}
      />
      <Feather
        name="moon"
        size={24}
        color={isDarkMode ? Colors.light.tint : Colors.dark.icon}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  icon: {
    marginHorizontal: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ThemeSwitch;
