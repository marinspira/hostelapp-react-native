import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState, Message } from "./interfaces";
import { RootState } from "@/redux/store";

const initialState: ChatState = {
  messages: [],
};

export const saveMessage = createAsyncThunk<void, Message, { state: RootState; rejectValue: string }>(
  "message/save",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/message/saveMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Erro ao salvar mensagem:", errorDetails);
        throw new Error("Falha ao enviar mensagem");
      }

      await response.json();

    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Define todas as mensagens no estado
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    // Adiciona uma nova mensagem ao topo da lista
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [action.payload, ...state.messages];
    },
  },
});

export const { setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;