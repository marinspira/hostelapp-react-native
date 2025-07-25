import React from 'react';
import Menu from '@/src/components/layout/TabMenu';

const tabIcons = {
  settings: 'user',
  // staff: 'team',
  index: 'home',
  // notifications: 'bells',
  // chat: 'message1',
};

export default function GuestTabLayout() {
  return <Menu role="guest" tabIcons={tabIcons} />
}
