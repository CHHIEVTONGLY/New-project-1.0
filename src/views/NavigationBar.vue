<template>
  <div class="py-8 bg-black text-white">
    <h1 class="flex justify-center text-3xl sm:text-5xl lg:text-6xl font-bold">
      LCT NEWS
    </h1>
    <div
      class="flex justify-center text-sm flex-wrap gap-4 sm:gap-10 sm:text-xl lg:text-2xl mt-12"
    >
      <router-link to="/" class="block px-3 py-2" @click="homeReset()"
        >HOME</router-link
      >
      <router-link to="/local/page/1" class="block px-3 py-2"
        >LOCAL</router-link
      >
      <router-link to="/world/page/1" class="block px-3 py-2"
        >WORLD</router-link
      >
      <router-link to="#" class="block px-3 py-2">ABOUT</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    homeReset() {
      sessionStorage.setItem("currentWorldPage", 1);
      sessionStorage.setItem("currentPage", 1);
    },
  },
};
</script>
