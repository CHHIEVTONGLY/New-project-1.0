<template>
  <div>
    <div
      v-for="x in newsData"
      :key="x._id"
      class="flex flex-col md:flex-row border-2 border-black mb-4"
      @click="getData(x._id)"
    >
      <img
        :src="x.imgUrl"
        alt="news-img"
        class="object-cover w-full md:max-w-xs h-56"
      />
      <div class="flex flex-col justify-between p-4">
        <div>
          <p class="text-gray-500">{{ x.time }}</p>
          <h1 class="text-xl font-bold">{{ limitLength(x.title, 50) }}</h1>
          <p>
            {{ limitLength(x.paragraph, 150) }}
          </p>
        </div>
        <div class="mt-4 md:mt-auto">
          <!-- This div will stay at the bottom -->
          <button
            class="group relative inline-block cursor-pointer focus:outline-none focus:ring"
          >
            <span
              class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
            ></span>

            <span
              class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
            >
              Continue reading
            </span>
          </button>
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
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.substring(0, maxLength) + "...";
      }
    },
    async fetchData() {
      const response = await axios.get("http://localhost:3000/api/localnews/few");
      this.newsData = response.data;
      console.log(this.newsData);
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
