import { Colors, Theme } from '@/src/constants/Colors';
import { RootState } from '@/src/redux/store';
import { TextStyle, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

export const useTheme = () => {
  const theme: Theme = useSelector((state: RootState) => state.theme.theme) as Theme;
  const color = Colors[theme];

  return {
    container: {
      backgroundColor: color.background,
    } as ViewStyle,

    text: {
      color: color.text,
      fontSize: 15,
      fontFamily: 'PoppinsRegular'
    } as TextStyle,

    textUppercase: {
      color: color.text,
      fontSize: 20,
      textTransform: 'uppercase',
      fontFamily: 'PoppinsBold'
    } as TextStyle,
  
    title: {
      color: color.text,
      fontSize: 28,
      fontFamily: 'PoppinsBold'
    } as TextStyle,

    titleUppercase: {
      color: color.text,
      fontSize: 35,
      fontFamily: 'PoppinsBold',
    } as TextStyle,

    h2: {
      color: color.text,
      fontSize: 20,
      fontFamily: 'PoppinsBold'
    } as TextStyle,

    h3: {
      color: color.text,
      fontSize: 18,
      fontFamily: 'PoppinsBold'
    } as TextStyle,

    suportText: {
      fontSize: 14,
      color: color.text,
    } as TextStyle,

    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      color: color.text,
      textTransform: 'uppercase',
      letterSpacing: 2,
    } as TextStyle,

    safeArea: {
      flex: 1,
      backgroundColor: color.background,
    } as ViewStyle,

    border: {
      borderColor: color.border,
    } as ViewStyle,

    tint: {
      backgroundColor: color.tint
    } as ViewStyle,

    header: {
      flexDirection: 'row',
      gap: 20,
      paddingBottom: 20,
      alignItems: 'center',
      position: "fixed",
      top: 0
    } as ViewStyle,

    statusBar: color.statusBar as any,
    icon: color.icon,
  };
};