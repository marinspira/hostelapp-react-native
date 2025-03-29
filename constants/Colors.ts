const lilac = '#9370DB';
const purple = '#6c63ff';
const orange = '#ff6363';
const green = '#d6f84c';
const gray = '#f1f1f1';
const white = '#fff';
const black = '#000';
const blackBackground = '#1a1a24';

export type Theme = 'light' | 'dark';

export const Colors: Record<Theme, {
  text: string;
  background: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tint: string;
  statusBar: string;
  border: string
}> = {
  light: {
    text: '#11181C',
    background: gray,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#6c63ff',
    tint: purple,
    statusBar: 'dark',
    border: '#eaeaea',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: orange,
    tint: orange,
    statusBar: 'light',
    border: black,
  },
};

