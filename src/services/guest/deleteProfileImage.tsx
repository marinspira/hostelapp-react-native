import { deleteGuestImage} from '@/src/redux/slices/guest';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/src/components/toast';

export const handleDeleteGuestImage = async (id: string) => {

    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    try {
        console.log(id)
        const response = await dispatch(deleteGuestImage({ id, endpoint: '/api/guest/deleteGuestProfileImage' }))
        console.log(response)
    } catch (error) {
        console.error('Error removing image: ', error)
        showToast({
            type: 'error',
            title: t('Algum erro aconteceu!'),
            message: t('Por favor, notifique seu bug nas configurações.')
        })
    }
}