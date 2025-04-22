import { useLocalSearchParams } from 'expo-router';
import { Colors } from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import GoBackButton from '@/src/components/goBackButton';
import { router } from "expo-router";
import { useTheme } from "@/src/hooks/useTheme";
import socket from "@/src/utils/socket";
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { useCreateNewMessage } from '@/src/services/chat/createNewMessage';
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