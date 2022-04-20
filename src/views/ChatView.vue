<template>
  <div class="h-100 w-100 px-1 px-md-4 py-2">
    <div
      class="d-flex align-items-center justify-content-around _w-25"
      v-if="!isConnected"
    >
      <el-input v-model="nickname" placeholder="Ingrese su alias" />
      <el-button class="mx-2" v-on:click.prevent="connect(nickname)"
        >Conectarse</el-button
      >
    </div>
  </div>
  <el-main class="w-100 h-100" v-loading="loading"> Chat </el-main>
</template>
<script>
import io from "socket.io-client";
import { ElMessage } from "element-plus";
export default {
  components: {},
  data() {
    return {
      nickname: "",
      isConnected: false,
      loading: false,
    };
  },
  methods: {
    connect(nickname) {
      this.loading = true;
      if (nickname == "" || nickname.length < 3) {
        ElMessage.warning(
          "El nombre de usuario debe tener al menos 3 caracteres"
        );
        this.loading = false;
        return;
      }
      try {
        this.socket = io(
          "https://jalex-chat.herokuapp.com/chat?nickname=" + nickname
        );
        this.isConnected = true;
        this.socket.on("connect", () => {
          console.log("Connected");
        });
        this.socket.on("message", (data) => {
          this.messages.push(data);
        });
        this.socket.on("disconnect", () => {
          console.log("Disconnected");
        });
      } catch (e) {
        ElMessage.error(e);
      }
      this.loading = false;
    },
    disconnect() {
      this.socket.disconnect();
      this.isConnected = false;
    },
  },
};
</script>
<style lang="scss">
._w-25 {
  width: 100%;
}
@media (min-width: 768px) {
  ._w-25 {
    width: 25%;
  }
}
</style>
