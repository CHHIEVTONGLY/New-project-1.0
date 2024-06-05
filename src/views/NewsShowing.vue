<template>
  <div class="border-b-2 pb-4 md:p-24">
    <div class="p-6 md:p-12 shadow-lg rounded-lg flex flex-col md:flex-row">
      <img
        :src="newsData.imgUrl"
        alt=""
        class="w-full h-72 rounded-_5lg md:rounded-lg md:w-1/3 object-cover"
      />
      <div class="flex flex-col ml-0 md:ml-4 mt-4 md:mt-0">
        <h1 class="text-gray-500">{{ newsData.date }}</h1>
        <h1 class="font-bold text-2xl md:text-3xl">{{ newsData.title }}</h1>
        <p
          class="mt-2 text-lg"
          v-html="formatParagraph(newsData.paragraph)"
        ></p>
        <div class="mt-auto">
          <h1 class="text-gray-500">{{ newsData.view }} Views</h1>
        </div>
      </div>
    </div>
    <div class="py-10 ml-4">
      <h1 class="text-larger font-Helvetica border-b-_1 border-gray-300">
        Relate News
      </h1>
    </div>
    <!-- Relate News component -->
    <div class="md:grid md:grid-cols-2">
      <div
        v-for="x in popularPosts"
        @click="getData(x._id)"
        :key="x._id"
        class="flex flex-row px-4 py-2 border-b-2"
      >
        <img class="w-20 h-20 object-cover rounded-lg" :src="x.imgUrl" alt="" />
        <div class="flex flex-col mx-4 md:ml-4">
          <strong>{{ x.title }}</strong>
          <p>
            {{ limitLength(x.paragraph, 40) }}
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
    this.pollingTimer = setInterval(this.fetchNews, 60000);
    this.pollingTimer1 = setInterval(this.popularPost, 60000);
  },
  beforeUnmount() {
    clearInterval(this.pollingTimer);
    clearInterval(this.pollingTimer1);
  },
  data() {
    return {
      newsData: [],
      popularPosts: [],
      pollingTimer: null,
      pollingTimer1: null,
      originalParagraph:
        "TikTok says it is addressing a cyber-attack that targeted several brands and celebrities.. The video-sharing app, which is owned by Chinese company ByteDance, told the BBC that a 'very limited' number of accounts had been compromised.. It added that it was working with users to restore access to their accounts. TikTok did not share further details on the perpetrators of the cyber-attack, or how it was carried out.. One of the compromised accounts belonged to news outlet CNN.. 'We have been collaborating closely with CNN to restore account access and implement enhanced security measures to safeguard their account moving forward,' a TikTok spokesperson said. 'We are dedicated to maintaining the integrity of the platform and will continue to monitor for any further inauthentic activity.' CNN did not immediately respond to a BBC request for comment.. TikTok said the account of reality TV star Paris Hilton was also targeted, but it was not compromised. Hilton, who has more than 10 million followers on TikTok, is an active user of the platform.",
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

    limitLength(text, maxLength) {
      if (!text) {
        return "";
      }
      return text.length <= maxLength
        ? text
        : text.substring(0, maxLength) + "...";
    },
    formatParagraph(paragraph) {
      if (!paragraph) return ""; // Return empty string if paragraph is undefined or empty

      // Join the sentences back together with "<br>" inserted between them
      return paragraph.split("|").join("<br><br>");
    },
  },
};
</script>
