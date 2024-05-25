<template>
  <div class="px-16 py-12 flex flex-row gap-2">
    <div class="md:basis-3/4">
      <news-component></news-component>
    </div>
    <div class=" hidden md:block basis-1/4">
      <popular-post></popular-post>
    </div>
  </div>
</template>

<script>
import NewsComponent from "@/components/NewsComponent.vue";
import PopularPost from "@/components/PopularPost.vue";
export default {
  components: {
    NewsComponent,
    PopularPost,
  },
};
</script>
