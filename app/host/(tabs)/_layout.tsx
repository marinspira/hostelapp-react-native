import React from 'react';
import Menu from '@/components/menu';

const tabIcons = {
  settings: 'user',
  // staff: 'team',
  index: 'home',
  notifications: 'bells',
  chat: 'message1',
};

export default function TabLayout() {
  return <Menu tabIcons={tabIcons} />
}