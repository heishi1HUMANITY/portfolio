<template>
  <router-link
    :to="`/p/${id}`"
    class="rounded py-6 px-3 mx-2 my-4 shadow-md sm:w-64 w-full flex flex-col items-center justify-start transition ease-in-out duration-500 transform hover:scale-105 card"
  >
    <img :src="src" alt="" class="h-24 w-full object-cover rounded" />
    <div class="w-full p-2 flex flex-col items-left justify-start">
      <h2 class="md:text-lg text-base antialiased mb-1 dark:text-gray-100">{{ title }}</h2>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    id: String,
    src: String,
    title: String,
  },
})
</script>

<style>
  @media (prefers-color-scheme: dark) {
    .card {
      background-color: rgb(70, 70, 70);
    }
  }
</style>
