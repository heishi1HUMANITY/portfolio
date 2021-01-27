<template>
  <div
    id="container"
    class="h-screen w-full flex flex-col items-center justify-center"
  >
    <h1
      class="text-4xl text-black dark:text-gray-100 antialiased transform -skew-x-12 mb-6"
    >
      <span v-if="error.statusCode === 404">404 NOT FOUND</span>
      <span v-else>{{ error.statusCode }} AN ERROR OCCURRED</span>
    </h1>
    <router-link
      to="/"
      class="text-xl text-black dark:text-gray-100 antialiased transform -skew-x-12 cursor-pointer relative overflow-hidden group"
    >
      BUCK TO TOP
      <span
        class="absolute top-0 left-0 h-full w-full border-t transition-all duration-300 ease-in-out border-black dark:border-gray-100 transform translate-x-full group-hover:translate-x-0"
      ></span>
      <span
        class="absolute top-0 left-0 h-full w-full border-b transition-all duration-300 ease-in-out border-black dark:border-gray-100 transform -translate-x-full group-hover:translate-x-0"
      ></span>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['error'],
  layout: 'error'
});
</script>

<style></style>
