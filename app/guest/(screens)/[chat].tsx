import { useLocalSearchParams } from 'expo-router';
import { Colors } from "@/constants/Colors";
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
import GoBackButton from '@/components/goBackButton';
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import socket from "@/utils/socket";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useCreateNewMessage } from '@/services/hostel/createNewMessage';
import Chat from '@/components/chat';

export default function ChatScreen() {

    const { chat } = useLocalSearchParams();
    const isGroup = typeof chat === 'string' && chat.startsWith("group-");

    return <Chat conversationOrUserId={chat} isGroup={isGroup} />
}