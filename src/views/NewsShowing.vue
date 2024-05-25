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
    <div class="grid grid-cols-2 gap-4">
      <div class="md:flex px-4 py-2 border-2">
        <img
          class="w-56 h-56 object-cover"
          src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
          alt=""
        />
        <div class="flex flex-col md:ml-4">
          <h1>John Stoe | 12/23/2023</h1>
          <strong>Title</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, culpa cupiditate facere fugit sit id ullam quia rerum
            itaque sint, sapiente, quod nesciunt aliquam. Non qui nulla
            molestias optio architecto?
          </p>
        </div>
      </div>
      <div class="md:flex px-4 py-2 border-2">
        <img
          class="w-56 h-56 object-cover"
          src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
          alt=""
        />
        <div class="flex flex-col md:ml-4">
          <h1>John Stoe | 12/23/2023</h1>
          <strong>Title</strong>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, culpa cupiditate facere fugit sit id ullam quia rerum
            itaque sint, sapiente, quod nesciunt aliquam. Non qui nulla
            molestias optio architecto?
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
  },
  data() {
    return {
      newsData: [],
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
        apiUrl = `http://localhost:3000/localnews/${newsId}`;
        updateView = `http://localhost:3000/localnews/update/${newsId}`;
      } else if (newsType === "world") {
        apiUrl = `http://localhost:3000/worldnews/${newsId}`;
        updateView = `http://localhost:3000/worldnews/update/${newsId}`;
      } else {
        console.error("Invalid news type.");
        return;
      }

      try {
        const response = await axios.get(apiUrl);
        await axios.put(updateView)
        this.newsData = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
