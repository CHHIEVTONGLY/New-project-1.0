<template>
  <div
    v-for="x in localNewsData"
    :key="x._id"
    class="flex flex-col md:flex-row border-2 border-black mb-4"
    @click="getData(x._id)"
  >
    <img
      :src="x.imgUrl"
      alt="news-img"
      class="object-cover w-full h-64 md:w-96 md:h-auto"
    />
    <div class="flex flex-col justify-between p-4">
      <div>
        <p class="text-gray-500">{{ x.time }}</p>
        <h1 class="text-xl font-bold">{{ limitLength(x.title, 100) }}</h1>
        <p>
          {{ limitLength(x.paragraph, 200) }}
        </p>
      </div>
      <div class="mt-4 md:mt-auto">
        <!-- This div will stay at the bottom -->
        <button
          class="group relative inline-block cursor-pointer focus:outline-none focus:ring"
          @click="getData(x._id)"
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      localNewsData: [],
      totalPage: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    click() {
      this.$router.push({ name: "NewsShowing" });
    },
    async fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/localnews/local?p=${this.currentPage}&pageSize=${this.pageSize}`
        );
        const count = await axios.get("http://localhost:3000/localnews/total");
        const tPage = count;
        this.totalPage = tPage.data.totalCount;
        this.localNewsData = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    getData(news) {
      console.log(news);
      if (news) {
        this.$router.push({ name: "NewsShowing", params: { news: news } });
      } else {
        console.error("News ID is undefined or null.");
      }
    },

    limitLength(text, maxLength) {
      if (!text) {
        return "";
      }
      return text.length <= maxLength
        ? text
        : text.substring(0, maxLength) + "...";
    },
  },
};
</script>
