import { io } from "socket.io-client";

const socket = io(process.env.EXPO_PUBLIC_SERVER_ADDRESS);
export default socket;