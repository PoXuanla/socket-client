import { defineStore } from "pinia";

export const useWsStore = defineStore("ws", () => {
  const socket = ref<WebSocket | undefined>(undefined);

  const createSocket = () => {
    socket.value = new WebSocket("ws://localhost:8080");
  };

  const sendMsg = (msg: string) => {
    socket.value?.send(msg);
  };

  function connect() {
    // Create WebSocket connection
    // 在開啟連線時執行
    if (!socket.value) createSocket();
    console.log("[connecting...]");
    socket.value!.onopen = () => console.log("[open connection]");
  }

  function disconnect() {
    if (socket.value) {
      socket.value.close();
      socket.value.onclose = () => console.log("[close connection]");
    }
  }

  return { createSocket, connect, disconnect, sendMsg };
});
