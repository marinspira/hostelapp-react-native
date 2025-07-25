import React from 'react';
import Menu from '@/src/components/layout/TabMenu';

const tabIcons = {
  settings: 'user',
  // volunteers: 'team',
  index: 'home',
  // notifications: 'bells',
  // chat: 'message1',
};

export default function TabLayout() {
  return <Menu role="host" tabIcons={tabIcons} />
}