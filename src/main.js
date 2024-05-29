import { createApp } from "vue";
import App from "./App.vue";
import "../src/assets/style.css";
import router from "./router";

console.log(process.env.VUE_APP_API_URL)
const app = createApp(App);
app.use(router);
app.mount("#app");
