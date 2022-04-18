<template>
  <el-main
    class="d-flex flex-column flex-md-row _bg justify-content-around align-items-center"
    :style="{ backgroundImage: 'url(' + bg + ')' }"
  >
    <div class="">
      <label for="nickname">Ingrese su alias: </label>
      <input
        placeholder="@juan"
        v-model="nickname"
        class="_input _text-white"
      />
    </div>
    <div class="_chat" :class="{ '_no-events': !isConnected }">
      <p v-if="!isConnected" class="my-2 _bold">
        No se tiene acceso al chat mientras no se conecte
      </p>
      <div class="_messages"></div>
      <div class="d-flex flex-row w-100 px-2 py-2">
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          class="_input w-75 _text-black"
        />
        <el-button class="_btn px-3 py-1 w-25">Enviar</el-button>
      </div>
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
* {
  font-family: "Nunito", sans-serif;
}
html,
body,
:root {
  --green: #53dd6c;
  --blue: #001220;
}

._bg {
  min-height: 100vh;
  width: 100%;
  background-image: url("https://drive.google.com/file/d/13bPIjeUALzbn1iekSrLW1AacXj_ZG1pT/view?usp=sharing");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
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

._text-white {
  color: white !important;
}
._text-black {
  color: black !important;
}

._btn {
  background: var(--blue) !important;
}
._bold{
  font-weight: bold;
}
._semibold{
  font-weight: 500;
}
@media (min-width: 768px) {
  ._chat {
    width: 40%;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
}
</style>
