<template>
  <header class="py-1 py-md-3 px-1 px-md-3 text-center">
    <p class="_title">Chat</p>
  </header>
  <main class="d-flex justify-around align-items-center">
    <div class="px-3 py-2 w-25 _border-radius" v-show="!isConnected">
      <el-input
        v-model="nickname"
        placeholder="Ingrese su nombre de usuario"
        class="my-2 w-100"
      /><el-button
        class="d-block mx-auto my-2"
        v-on:click.prevent="connect(nickname)"
        >Ir al chat</el-button
      >
    </div>
    <div v-show="!isConnected">c</div>
    <div v-show="isConnected" class="_bg-primary w-100 p-0">
      <div class="px-2 px-md-4 my-0">
        <p class="text-center py-2">
          Conectado como <span class="bold">{{ nickname }}</span>
        </p>
      </div>
      <section class="bg-white px-1 px-md-3">
        <div
          class="_border-radius"
          v-for="(item, index) in messages"
          :key="index"
        >
          <p class="d-block w-100 my-0">
            <span class="bold"> {{ item.nickname }}</span
            >: <span>{{ item.message }}</span>
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import io from "socket.io-client";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      socket: null,
      isConnected: false,
      nickname: null,
      messages: [],
    };
  },
  mounted() {
    // Traer del localstorage el nickname
    this.nickname = localStorage.getItem("nickname");
    if (!this.nickname) {
      ElMessage.error("No hay sesión iniciada");
    } else {
      this.connect(this.nickname);
    }
  },
  methods: {
    connect(nickname) {
      if (nickname == "" || nickname.length < 3) {
        ElMessage.warning(
          "El nombre de usuario debe tener al menos 3 caracteres"
        );
        return;
      }
      this.socket = io(
        "https://jalex-chat.herokuapp.com/chat?nickname=" + nickname
      );
      this.isConnected = true;
      // Setear el nickname en el localstorage
      localStorage.setItem("nickname", nickname);
      this.socket.on("connect", () => {
        console.log("Connected");
      });
      this.socket.on("message", (data) => {
        this.messages.push(data);
      });
      this.socket.on("disconnect", () => {
        console.log("Disconnected");
      });
    },
    disconnect() {
      this.socket.disconnect();
      this.isConnected = false;
      localStorage.removeItem("nickname");
    },
  },
};
</script>
<style lang="scss">

._title {
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 0px 0px 10px var(--primary);
  text-transform: lowercase;
}

.h-100 {
  height: 100% !important;
}

._bg-primary {
  background-color: var(--primary) !important;
}

.bold {
  font-weight: bold;
}

._border-radius {
  border-radius: 10px;
}
</style>
