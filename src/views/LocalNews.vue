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
      class="object-cover w-full md:max-w-xs h-56"
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
            class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-gray-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>

          <span
            class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          >
            Read more
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="inline-flex justify-center gap-1">
      <button
        @click="prevPage"
        class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <span class="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div>
        <label for="PaginationPage" class="sr-only">Page</label>

        <input
          type="number"
          class="h-8 w-12 rounded border border-gray-100 bg-white p-0 text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          min="1"
          :value="currentPage"
          id="PaginationPage"
        />
      </div>

      <button
        @click="nextPage"
        class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <span class="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
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
      currentPage: 1,
      pageSize: 5, // Adjust according to your backend pagination
      pollingTimer: null,
    };
  },
  mounted() {
    this.fetchData();
    this.pollingTimer = setInterval(this.fetchData, 60000);
  },
  beforeUnmount() {
    clearInterval(this.pollingTimer);
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_API_URL +
            `api/localnews/local?p=${this.currentPage}&pageSize=${this.pageSize}`
        );
        const count = await axios.get(
          process.env.VUE_APP_API_URL + "api/localnews/total"
        );
        const tPage = count;
        this.totalPage = tPage.data.totalCount;
        this.localNewsData = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPage / 5) this.currentPage++;
      this.fetchData();
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
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
