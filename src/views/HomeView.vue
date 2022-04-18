<template>
  <header class="header content">
    <div class="header-video">
      <video
        src="https://firebasestorage.googleapis.com/v0/b/chat-jalex.appspot.com/o/Pexels%20Videos%203978.mp4?alt=media&token=c0e61401-6196-43bc-8c5b-1ca2e4586cf0"
        autoplay
        loop
        muted
        id="video"
      ></video>
    </div>
    <div class="header-overlay"></div>
    <div class="header-content">
      <div class="text-center">
        <p class="text-muted my-0">by javier morales</p>
        <p class="bold _title my-0">Chat WS</p>
        <p class="_subtitle my-0">&Uacute;nete a mantenernos comunicados.</p>
      </div>
      <button class="_btn my-2" v-on:click.prevent="goChat()">Unirse</button>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    goChat() {
      this.$router.push("/chat");
    },
  },
};
</script>
<style lang="scss">
.header {
  height: 100vh;
  display: flex;
  align-items: center;
  color: #fff;
}

.content {
  max-width: 80%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: auto;
  text-align: center;
}

.header-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.header-video video {
  // Cover the entire screen with video
  min-width: 100%;
  min-height: 100vh;
  object-fit: cover;
}

.header-overlay {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--gray);
  z-index: 1;
  opacity: 0.9;
}

.header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  z-index: 2;
  text-align: center;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }
}
</style>
