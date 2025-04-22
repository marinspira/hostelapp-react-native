import { router } from "expo-router";

export default function goToChat(role: "host" | "guest", chatId: string) {
console.log("role: ", role)
console.log("parametro: ", chatId)

    router.push({
      pathname: `/${role}/(screens)/[chat]`,
      params: { chat: chatId },
    } as any);
  }
  