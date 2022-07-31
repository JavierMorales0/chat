<template>
  <el-main class="p-0 m-0 _h-100">
    <div class="row _bg-secondary w-100 px-1 py-3">
      <div
        class="col-12 col-md-5 d-flex justify-content-around align-items-center _border-right"
      >
        <el-avatar :size="32" :src="circleUrl" />
        <span class="_semibold text-muted">{{ nickname || "nobody" }}</span>
      </div>
      <div
        class="col-12 col-md-7 text-center d-flex justify-content-center align-items-center"
      >
        <span> {{ notification }}</span>
      </div>
    </div>
    <div class="d-flex flex-column mx-5 my-2">
      <div
        class="d-flex flex-wrap flex-column justify-content-end _bg-secondary my-2 px-3 py-2 br"
        style="max-width: 400px"
        v-for="(item, index) in messages"
        :class="{ 'ml-auto': item.nickname == 'Yo' }"
        :key="index"
      >
        <span v-if="item.by" class="text-muted" style="font-size: 0.8em"
          >BOT 🤖</span
        >
        <span
          v-if="item.nickname"
          class="text-muted"
          style="font-size: 0.8em"
          >{{ item.nickname }}</span
        >
        <p>{{ item.message }}</p>
      </div>
    </div>
    <div class="row w-100">
      <div class="col-12 px-3 py-2"></div>
    </div>
    <div
      class="fixed-bottom my-1 my-md-3 w-100 d-flex justify-content-center align-items-center"
    >
      <input
        type="text"
        name=""
        id=""
        class="_input _input-text-left mx-2"
        v-model="message"
        placeholder="Escriba un mensaje"
        v-on:keyup="typing()"
      />
      <el-button
        class="_btn mx-2"
        type="primary"
        v-on:click.prevent="sendMessage(message)"
        >Enviar</el-button
      >
    </div>
  </el-main>
</template>
<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
      isConnected: false,
      nickname: "",
      messages: [],
      message: "",
      notification: "",
    };
  },
  props: {
    username: {
      type: String,
      default: "",
    },
  },
  mounted() {
    // Get the params from url
    const { username } = this.$route.params;
    // Verify if username is valid
    if (username) {
      // Set the username
      this.nickname = username;
      // Connect to the server
      this.connect(this.nickname);
    } else {
      // Redirect to home
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    connect(nickname) {
      this.socket = io(
        "https://jalex-chat.herokuapp.com/chat?nickname=" + nickname
      );
      this.socket.on("connect", () => {
        this.isConnected = true;
      });
      this.socket.on("message", (message) => {
        this.messages.push(message);
      });
      this.socket.on("chat:actions", (message) => this.messages.push(message));
      this.socket.on(
        "chat:typing",
        (message) => (this.notification = message.message)
      );
      this.socket.on("chat:nottyping", () => (this.notification = ""));
    },
    sendMessage(message) {
      if (message) {
        this.socket.emit("chat:message", message);
        this.messages.push({ nickname: "Yo", message });
        this.message = "";
      }
    },
    typing() {
      // Create a timeout to send the typing message
      this.socket.emit("chat:typing");
      setTimeout(() => {
        this.socket.emit("chat:nottyping");
      }, 2000);
    },
  },
};
</script>
<style lang="scss">
._bg {
  min-height: 100vh;
  width: 100%;
  color: white;
}

._h-100 {
  height: 100vh;
}

.br {
  border-radius: 15px;
}

@media (min-width: 768px) {
}
</style>
