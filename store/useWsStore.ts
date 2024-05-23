import { defineStore } from "pinia";

export const useWsStore = defineStore("ws", () => {
  const socket = ref<WebSocket | undefined>(undefined);

  const createSocket = () => {
    socket.value = new WebSocket("ws://localhost:8080");
  };

  const sendMsg = (msg: string) => {
    socket.value?.send(msg);
  };
  const onopen = () => {
    console.log("[open connection]");
  };
  const onmessage = (event: MessageEvent) => {
    console.log(`[Message from server]:\n %c${event.data}`, "color: blue");
  };

  const onclose = () => console.log("[close connection]");

  const connect = () => {
    // Create WebSocket connection
    // 在開啟連線時執行
    if (!socket.value) createSocket();

    console.log("[connecting...]");

    socket.value!.onopen = onopen;

    socket.value!.onmessage = onmessage;

    socket.value!.onclose = onclose;
  };

  function disconnect() {
    if (socket.value) {
      socket.value.close();
    }
  }

  return { createSocket, connect, disconnect, sendMsg };
});
