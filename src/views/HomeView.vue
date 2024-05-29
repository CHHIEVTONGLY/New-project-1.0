<template>
  <div class="md:px-16 md:py-12 flex flex-row gap-2">
    <div class="md:basis-3/4">
      <!-- recently News -->
      <div>
        <div class="flex py-4">
          <router-link
            to="/local"
            class="text-larger cursor-pointer font-bold font-Helvetica"
            >Recently News</router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2.4em"
            viewBox="0 0 16 9"
          >
            <path
              fill="currentColor"
              d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"
            />
            <path
              fill="currentColor"
              d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"
            />
          </svg>
        </div>
        <news-component></news-component>
      </div>
      <!-- World news -->
      <div>
        <div class="flex py-4">
          <router-link
            to="/world"
            class="text-larger cursor-pointer font-bold font-Helvetica"
            >World News</router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2.4em"
            viewBox="0 0 16 9"
          >
            <path
              fill="currentColor"
              d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"
            />
            <path
              fill="currentColor"
              d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"
            />
          </svg>
        </div>
        <worldnews-preview></worldnews-preview>
      </div>
    </div>
    <div class="hidden md:block basis-1/4">
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
