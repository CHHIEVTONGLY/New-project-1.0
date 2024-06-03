<template>
  <div class="grid grid-cols-1 px-2">
    <div class="flex p-4">
      <router-link
        to="/world/page/1"
        class="text-larger cursor-pointer font-bold font-Helvetica"
        >World News</router-link
      >
    </div>
    <!-- Component -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div
        v-for="x in newsData"
        :key="x._id"
        @click="getData(x._id)"
        class="flex flex-row border-2 p-2 border-gray-100 rounded-_2lg bg-gray-100 mt-2 mb-2 md:p-0 md:grid md:rounded-none md:flex-col"
      >
        <div class="basis-1/3">
          <img
            class="w-24 h-24 object-cover rounded-_2lg md:w-full md:h-48 md:rounded-none"
            :src="x.imgUrl"
            alt=""
          />
        </div>
        <div class="flex flex-col justify-between basis-3/4 p-2">
          <div>
            <h1 class="font-bold font-Helvetica">
              {{ limitLength(x.title, 50) }}
            </h1>
            <p>{{ limitLength(x.paragraph, 50) }}</p>
          </div>
          <span class="flex justify-end text-gray-400 text-smallest">
            <span class="mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m1-8h4v2h-6V7h2z"
                />
              </svg>
            </span>
            {{ x.date }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newsData: [],
      popularData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    click() {
      this.$router.push({ name: "NewsShowing" });
    },

    limitLength(text, maxLength) {
      if (!text) {
        return "";
      }
      return text.length <= maxLength
        ? text
        : text.substring(0, maxLength) + "...";
    },
    async fetchData() {
      const response = await axios.get(
        process.env.VUE_APP_API_URL + "api/worldnews/post/few"
      );
      this.newsData = response.data;
    },
    getData(news) {
      if (news) {
        const newsType = "world";
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
