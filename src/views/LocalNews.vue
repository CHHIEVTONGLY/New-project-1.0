<template>
  <div
    v-for="x in localNewsData"
    :key="x._id"
    class="flex flex-col p-4 border-b-2 border-gray-300 md:flex-row cursor-pointer group"
    @click="getData(x._id)"
  >
    <img
      :src="x.imgUrl"
      alt="news-img"
      class="object-cover w-full h-56 md:max-w-xs hover:opacity-75"
    />
    <div class="flex flex-col justify-between p-4">
      <div>
        <p class="text-gray-500">{{ x.time }}</p>
        <h1
          class="text-xl font-bold font-KhmerTitle group-hover:underline group-hover:decoration-solid"
        >
          {{ limitLength(x.title, 100) }}
        </h1>
        <p class="font-KhmerParagraph">
          {{ limitLength(x.paragraph, 200) }}
        </p>
      </div>
      <div class="flex justify-between">
        <h1 class="flex-grow text-left text-smallest mt-4">
          {{ x.date }} | <Strong>Local</Strong>
        </h1>
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
      currentPage: 1,
      totalPage: 0,
      pageSize: 5, // Adjust according to your backend pagination
      pollingTimer: null,
    };
  },

  mounted() {
    const storedPage = parseInt(sessionStorage.getItem("currentPage"));
    if (!isNaN(storedPage)) {
      this.currentPage = storedPage;
    }
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
            `api/localnews/local/page/${this.currentPage}/`,
          {
            params: { page: this.currentPage },
          }
        );
        const count = await axios.get(
          process.env.VUE_APP_API_URL + "api/localnews/total"
        );
        this.totalPage = Math.ceil(count.data.totalCount);
        this.localNewsData = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async nextPage() {
      if (this.currentPage < this.totalPage / 10) {
        this.currentPage++;
        await this.updatePage();
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.updatePage();
      }
    },

    async updatePage() {
      await this.fetchData();
      sessionStorage.setItem("currentPage", this.currentPage);
      this.$router.push(`/local/page/${this.currentPage}`);
      this.scrollToTop();
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
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional, smooth scrolling behavior
      });
    },
  },
};
</script>
