import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import setupInterceptors from './services/setupInterceptors';
import { FontAwesomeIcon } from './plugins/font-awesome'

setupInterceptors(store);

createApp(App)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");