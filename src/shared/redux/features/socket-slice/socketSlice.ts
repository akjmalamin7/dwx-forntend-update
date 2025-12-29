import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SocketState = {
  connected: boolean;
  messages: WSMessage[];
};

const initialState: SocketState = {
  connected: false,
  messages: [],
};

const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    connected: (state) => {
      state.connected = true;
    },
    disconnected: (state) => {
      state.connected = false;
    },
    socketMessageReceived: (state, action: PayloadAction<WSMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  connected,
  disconnected,
  socketMessageReceived,
  clearMessages,
} = socketSlice.actions;

export default socketSlice.reducer;
