import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/src/components/layout/ToastNotification';
import { uploadGuestImage } from '@/src/redux/slices/guest';

export const useUploadGuestImages = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleUploadGuestImages = async (file: any) => {
    if (file) {
      try {
        const response = await dispatch(uploadGuestImage({
          file,
        }));

        showToast({
          type: 'success',
          title: t('Enviado!'),
          message: t('Upload feito com sucesso.')
        });

      } catch (err) {
        console.error(`Error upload: `, err);
        showToast({
          type: 'error',
          title: t('Algum erro aconteceu!'),
          message: t('Por favor, notifique seu bug nas configurações.')
        });
      }
    }
  };

  return handleUploadGuestImages;
};
