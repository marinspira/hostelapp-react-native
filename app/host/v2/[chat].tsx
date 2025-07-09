import { useLocalSearchParams } from 'expo-router';
import Chat from '@/src/components/chat';

export default function ChatScreen() {

    const params = useLocalSearchParams();

    const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId;
    const name = Array.isArray(params.name) ? params.name[0] : params.name;
    const photo = Array.isArray(params.photo) ? params.photo[0] : params.photo;
    const conversationId = Array.isArray(params.conversationId) ? params.conversationId[0] : params.conversationId;

    const participant = {
        userId,
        name,
        photo
    }

    return <Chat participant={participant} conversationId={conversationId} />
}
