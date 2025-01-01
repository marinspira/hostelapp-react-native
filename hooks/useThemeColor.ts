import { Colors, Theme } from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { TextStyle } from 'react-native';
import { useSelector } from 'react-redux';

export const useTheme = () => {

  const theme: Theme = useSelector((state: RootState) => state.theme.theme) as Theme;
  const color = Colors[theme];

  return {
    container: {
      backgroundColor: color.background,
    },
    text: {
      color: color.text,
    },
    title: {
      color: color.text,
      fontSize: 25,
      fontFamily: 'PoppinsBold'
    },
    suportText: {
      fontSize: 16,
      color: color.text,
    },
    label: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 8,
      color: color.text,
      textTransform: 'uppercase',
      letterSpacing: 2,
    } as TextStyle,
    safeArea: {
      flex: 1,
      backgroundColor: color.background,
    },
    border: {
      borderColor: color.border
    },
    tint: {
      backgroundColor: color.tint
    },
    statusBar: color.statusBar as any,
    icon: color.icon,
  };
};
