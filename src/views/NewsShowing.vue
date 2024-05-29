<template>
  <div class="border-b-2 pb-4 md:p-24">
    <div class="p-6 md:p-12 border-2 border-black flex flex-col md:flex-row">
      <img :src="newsData.imgUrl" alt="" class="w-full md:w-1/3 object-cover" />
      <div class="flex flex-col ml-0 md:ml-4 mt-4 md:mt-0">
        <h1 class="text-gray-500">{{ newsData.time }}</h1>
        <h1 class="font-bold text-xl md:text-2xl">{{ newsData.title }}</h1>
        <p class="mt-2">
          {{ newsData.paragraph }}
        </p>
        <div class="mt-auto">
          <h1 class="text-gray-500">{{ newsData.view }} Views</h1>
        </div>
      </div>
    </div>
    <div class="py-10">
      <h1 class="text-larger font-Helvetica border-b-_1 border-black">
        Relate News
      </h1>
    </div>
    <!-- Relate News component -->
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="x in popularPosts"
        @click="getData(x._id)"
        :key="x._id"
        class="md:flex px-4 py-2 border-2"
      >
        <img class="w-56 h-56 object-cover" :src="x.imgUrl" alt="" />
        <div class="flex flex-col md:ml-4">
          <strong>{{ x.title }}</strong>
          <p>
            {{ x.paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.fetchNews();
    this.popularPost();
  },
  data() {
    return {
      newsData: [],
      popularPosts: [],
    };
  },
  methods: {
    async fetchNews() {
      const newsType = this.$route.params.newsType; // Get the news type from route params
      const newsId = this.$route.params.id; // Get the news ID from route params

      let apiUrl = "";
      let updateView = "";

      // Determine API endpoint based on news type
      if (newsType === "local") {
        apiUrl = process.env.VUE_APP_API_URL + `api/localnews/${newsId}`;
        updateView =
          process.env.VUE_APP_API_URL + `api/localnews/update/${newsId}`;
      } else if (newsType === "world") {
        apiUrl = process.env.VUE_APP_API_URL + `api/worldnews/${newsId}`;
        updateView =
          process.env.VUE_APP_API_URL + `api/worldnews/update/${newsId}`;
      } else {
        console.error("Invalid news type.");
        return;
      }

      try {
        const response = await axios.get(apiUrl);
        await axios.put(updateView);
        this.newsData = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async popularPost() {
      const response = await axios.get(
        process.env.VUE_APP_API_URL + "api/localnews/few"
      );
      this.popularPosts = response.data;
    },
    getData(news) {
      if (news) {
        const newsType = "local";
        this.$router.push({
          name: "NewsShowing",
          params: { newsType: newsType, id: news },
        });
        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 1); // Adjust the delay as needed
      } else {
        console.error("News ID is undefined or null.");
      }
    },
  },
};
</script>
