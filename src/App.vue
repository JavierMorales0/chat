<template>
  <el-main>
    <div class="row">
      <div
        class="col-12 col-md-5 d-flex justify-content-around align-items-center"
      >
        <el-avatar :size="32" :src="circleUrl" />
        <p class="bold">{{ username }} online</p>
      </div>
      <div class="col-12 col-md-7"></div>
    </div>
  </el-main>
</template>
<script>
import bg from "@/assets/bg.svg";
export default {
  data() {
    return {
      socket: null,
      isConnected: false,
      nickname: "",
      messages: [],
      bg: bg,
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
._bg {
  min-height: 100vh;
  width: 100%;
  color: white;
}

._input {
  background-color: transparent;
  margin: 0 1rem;
  border-bottom: 1px solid var(--blue);
  border-radius: 0;
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--green);
  }
}

._no-events {
  pointer-events: none;
  // No permitir la selesccion de texto
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

._chat {
  height: 70vh;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: black;
}
._messages {
  width: 100%;
  padding: 10px 20px;
  flex: 1;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  overflow-y: auto;
}
@media (min-width: 768px) {
  ._chat {
    width: 40%;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
}
</style>
