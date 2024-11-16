import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';

interface TabContent {
  label: string;
  content: string;
}

interface TabsProps {
  tabs: { label: string; content: any; }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tab, activeTabIndex === index && styles.activeTab]}
            onPress={() => setActiveTabIndex(index)}
          >
            <Text style={activeTabIndex === index ? styles.activeText : styles.inactiveText}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conteúdo das Abas */}
      <View style={styles.content}>
        <Text style={styles.contentText}>
          {tabs[activeTabIndex].content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    borderRadius: 12,
    padding: 10,
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 0,
    width: '100%'
  },
  tab: {
    padding: 15,
    width: '33%',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#9f39ff',
    borderRadius: 10
  },
  activeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'PoppinsRegular',
  },
  inactiveText: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'PoppinsRegular',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 20,
  },
});

export default Tabs;
