<template>
  <div class="px-8 py-8 shadow-lg">
    <h1 class="text-lg font-bold">Popular Post</h1>
    <div
      v-for="x in fewData"
      :key="x._id"
      class="flex border-b-2 border-gray-100 mb-2"
    >
      <div @click="getData(x._id)" class="p-1 cursor-pointer flex-shrink-0">
        <img class="w-24 h-24 object-cover" :src="x.imgUrl" alt="News Image" />
      </div>
      <div class="flex flex-col ml-4 justify-center flex-grow">
        <strong>{{ x.title }}</strong>
        <span class="text-smallest text-gray-400">
          {{ x.date }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fewData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await axios.get(
        process.env.VUE_APP_API_URL + "api/localnews/popular/post"
      );
      this.fewData = response.data;
    },
    getData(news) {
      if (news) {
        const newsType = "local";
        this.$router.push({
          name: "NewsShowing",
          params: { newsType: newsType, id: news },
        });
      } else {
        console.error("News ID is undefined or null.");
      }
    },
  },
};
</script>
