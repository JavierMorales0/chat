<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center h-100"
  >
    <input
      type="text"
      placeholder="Ingrese nombre de usuario"
      class="_input"
      v-model="user"
    />
    <el-button
      class="w-25 m-2 _btn"
      size="large"
      type="primary"
      @click="connect(user)"
    >
      Conectar
    </el-button>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      user: "",
    };
  },
  methods: {
    connect(user) {
      if (this.validateUser(user)) {
        this.$router.push({
          name: "Chat",
          params: {
            username: user,
          },
        });
      } else {
        ElMessage.error("Ingrese un nombre de usuario valido");
      }
    },
    validateUser(user) {
      if (user.length < 0) {
        return false;
      }
      if (user === "") {
        return false;
      }
      if (user.length > 50) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang=""></style>
