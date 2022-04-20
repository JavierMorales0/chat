import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import ElementPlus from "element-plus";
import es from "element-plus/es/locale/lang/es";
import "@/assets/index.scss";
import "@/assets/main.css";

createApp(App)
  .use(ElementPlus, {
    locale: es,
  })
  .use(store)
  .use(router)
  .mount("#app");
