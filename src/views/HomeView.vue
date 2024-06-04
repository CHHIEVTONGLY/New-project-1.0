<template>
  <div class="md:px-12 md:py-12 flex flex-col md:flex-row md:gap-2">
    <div class="md:basis-3/4 shadow-lg">
      <!-- recently News -->
      <div>
        <news-component></news-component>
      </div>
      <!-- World news -->
      <div>
        <worldnews-preview></worldnews-preview>
      </div>
    </div>
    <!-- Popular post on desktop view -->
    <div class="md:block md:basis-1/4">
      <popular-post></popular-post>
    </div>
  </div>
</template>


<script>
import NewsComponent from "@/components/NewsComponent.vue";
import PopularPost from "@/components/PopularPost.vue";
import WorldnewsPreview from "@/components/worldnewsPreview.vue";
export default {
  components: {
    NewsComponent,
    PopularPost,
    WorldnewsPreview,
  },
};
</script>
