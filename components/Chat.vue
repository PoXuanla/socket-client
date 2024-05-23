<template>
  <button @click="connect">建立連線</button>
  <input type="text" v-model="text" />
  <button @click="confirm">送出</button>
  <button @click="disconnect">中斷連線</button>
</template>

<script setup lang="ts">    
import { useWsStore } from "@/store/useWsStore";

const wsStore = useWsStore();
const text = ref("");

const confirm = () => {
  wsStore.sendMsg(text.value);
  text.value = "";
};
const connect = () => {
  wsStore.connect();
};

const disconnect = () => {
  wsStore.disconnect();
};

onMounted(() => {
  wsStore.createSocket();
});
</script>
