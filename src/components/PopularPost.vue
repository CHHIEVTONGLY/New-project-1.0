<template>
  <div class="px-8 py-8 border-2 border-black">
    <h1 class="border-b-2 border-black mb-4 text-lg">Popular Post</h1>
    <div v-for="x in fewData" :key="x._id" class="flex border-b-2 border-black">
      <div @click="getData(x._id)" class="p-2">
        <img class="max-w-24 max-h-24" :src="x.imgUrl" alt="" />
      </div>
      <div class="flex flex-col ml-4">
        <strong>{{ x.title }}</strong>
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
      const response = await axios.get(process.env.VUE_APP_API_URL +"api/localnews/few");
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
