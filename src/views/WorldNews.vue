<template>
  <div class="flex flex-col md:flex-row border-2 border-black mb-4">
    <img
      src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
      alt="news-img"
      class="object-cover w-full h-64 md:w-96 md:h-auto"
    />
    <div class="flex flex-col justify-between p-4">
      <div>
        <p class="text-gray-500">John Doe, March 11, 2024</p>
        <h1 class="text-xl font-bold">WorldNews</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A sed quo
          sapiente assumenda nulla soluta vel veritatis, eligendi voluptatum
          aperiam cum aut nihil blanditiis dolor, dicta obcaecati, dolores porro
          ab.
        </p>
      </div>
      <div class="mt-4 md:mt-auto">
        <!-- This div will stay at the bottom -->
        <button
          class="group relative inline-block cursor-pointer focus:outline-none focus:ring"
          @click="click()"
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
export default {
  methods: {
    click() {
      this.$router.push({ name: "NewsShowing" });
    },
  },
};
</script>
