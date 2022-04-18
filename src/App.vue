<template>
  
  <router-view></router-view>
</template>
<script>
export default {
  data() {
    return {
      socket: null,
      isConnected: false,
      nickname: null,
      messages: [],
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
  --yellow: #ff9f1c;
  --white: #fafafa;
  --gray: #37392e;
  --blue: #5d5f71;
}

#app {
  min-height: 100vh;
  width: 100%;

  color: black;
}

._btn {
  background-color: var(--green);
  color: black;
  padding: 1rem 3rem;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 0.5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
._btn:hover {
  cursor: pointer;
  background: var(--gray);
  color: var(--green);
}
._h-100 {
  height: 100vh !important;
}

.bold {
  font-weight: bold;
}

._title {
  font-size: 4rem;
  letter-spacing: 1px;
  color: var(--green);
}

._subtitle {
  font-size: 1.5rem;
  letter-spacing: 1px;
}

._bg-white {
  background: var(--white) !important;
}
</style>
