<template>
  <div class="py-8 bg-black text-white">
    <h1
      class="flex justify-center text-4xl sm:text-5xl lg:text-6xl font-Roboto font-bold"
    >
      LCT NEWS
    </h1>
    <div
      class="flex justify-center flex-wrap gap-4 sm:gap-10 text-lg sm:text-xl lg:text-2xl mt-12"
    >
      <router-link to="/" class="block px-3 py-2">HOME</router-link>
      <router-link to="/local/page/1" class="block px-3 py-2">LOCAL</router-link>
      <router-link to="/world/page/1" class="block px-3 py-2">WORLD</router-link>
      <a href="#" class="block px-3 py-2">ABOUT</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>
