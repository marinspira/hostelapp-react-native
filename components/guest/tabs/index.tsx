import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder, Dimensions } from 'react-native';
import FormGuest from '../formGuest';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';

interface TabsProps {
  tabs: { label: string; content: any; }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const dynamicStyles = useTheme()

  const { width: screenWidth } = Dimensions.get('window');
  const tabWidth = (screenWidth - (tabs.length - 1) * 10 - 40) / tabs.length;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 20,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -20) {
        setActiveTabIndex((prevIndex) => (prevIndex + 1) % tabs.length);
      } else if (gestureState.dx > 20) {
        setActiveTabIndex((prevIndex) => (prevIndex - 1 + tabs.length) % tabs.length);
      }
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>

      {/* Label das Abas */}
      <View style={[styles.tabContainer]}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.label}
            style={[
              styles.tab,
              { width: tabWidth },
              activeTabIndex === index && styles.activeTab,
            ]}
            onPress={() => setActiveTabIndex(index)}
          >
            <Text style={activeTabIndex === index ? styles.activeText : [styles.inactiveText, dynamicStyles.text]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conteúdo das Abas */}
      <View style={styles.content}>
        <View>
          {tabs[activeTabIndex].content}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: -10,
    padding: 10,
  },
  tab: {
    padding: 15,
    borderRadius: 8,
    // backgroundColor: '#ccc',
  },
  activeTab: {
    backgroundColor: Colors.light.tint,
  },
  activeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'PoppinsRegular',
    // textTransform: 'uppercase',
    fontSize: 16
  },
  inactiveText: {
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    // textTransform: 'uppercase',
    fontSize: 16
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tabs;
