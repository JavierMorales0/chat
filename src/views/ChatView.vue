<template>
  <el-main class="p-0 m-0">
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
        <span>Chat with {{ nickname || "nobody" }}.</span>
      </div>
    </div>
    <div class="row w-100">
      <div class="col-12 px-3 py-2">Hola</div>
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

@media (min-width: 768px) {
}
</style>
