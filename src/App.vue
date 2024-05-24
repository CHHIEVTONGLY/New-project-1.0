<template>
  <div>
    <NavigationBarVue></NavigationBarVue>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBarVue from "./views/NavigationBar.vue";
export default {
  name: "App",
  components: {
    NavigationBarVue,
  },
};
</script>
