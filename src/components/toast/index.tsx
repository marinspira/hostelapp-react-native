import Toast from "react-native-toast-message";

type ToastProps = {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
};

export const showToast = ({ type, title, message }: ToastProps): void => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};