import socket from "@/utils/socket";
import { useEffect, useState } from "react";

interface chatProps {
  participants: string[]
}

export default function chat({ participants }: chatProps) {

  const [message, setMessage] = useState<string>('');
      const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'other' }[]>([]);
  
      const room = "1"
  
      useEffect(() => {
          const joinRoom = () => {
              socket.emit("join_room", room);
          };
          joinRoom()
      }, [])
  
      const sendMessage = () => {
          if (!message.trim()) return;
          socket.emit("send_message", { message, room });
  
          setMessages(prev => [...prev, { text: message, sender: 'me' }]);
          setMessage('');
      };
  
      useEffect(() => {
          socket.on("receive_message", (data) => {
              setMessages(prev => [...prev, { text: data.message, sender: 'other' }]);
          });
  
          return () => {
              socket.off("receive_message");
          };
      }, []);

  return (

  )
}