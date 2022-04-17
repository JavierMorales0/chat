<template>
  <div>
    <input type="text" v-model="nickname" v-if="!connected" />
    <button v-on:click.prevent="connect(nickname)" v-if="!connected">
      Conectar
    </button>
    <button v-on:click.prevent="disconnect(nickname)" v-if="connected">
      Desconectar
    </button>
  </div>
</template>
<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
      connected: false,
      nickname: null,
    };
  },
  methods: {
    connect(nickname) {
      if (!nickname) {
        alert("Por favor, escriba un nickname");
        return;
      }
      this.socket = io(
        "https://jalex-chat.herokuapp.com/chat?nickname=" + nickname
      );
      this.connected = true;
      this.socket.on("connect", () => {
        console.log("Connected");
      });
      this.socket.on("message", (data) => {
        console.log(data);
      });
      this.socket.on("disconnect", () => {
        console.log("Disconnected");
      });
    },
    disconnect() {
      this.socket.disconnect();
      this.connected = false;
    },
  },
};
</script>
<style lang=""></style>
