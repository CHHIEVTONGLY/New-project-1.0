<template>
  <div class="px-24 py-12 flex flex-row">
    <div class="basis-3/4">
      <news-component></news-component>
    </div>
    <div class="basis-1/4">
      <h1>Testing</h1>
    </div>
  </div>
</template>

<script>
import NewsComponent from "@/components/NewsComponent.vue";
export default {
  components: {
    NewsComponent,
  },
};
</script>
