<template>
  <router-link
    :to="`/p?id=${id}`"
    class="rounded py-6 px-3 shadow-md w-64 flex flex-col items-center justify-between transition ease-in-out duration-500 transform hover:scale-105"
  >
    <img :src="src" alt="" class="h-24 w-full object-cover rounded" />
    <div class="w-full p-2 flex items-left">
      <h2 class="md:text-lg text-base antialiased mb-1">{{ title }}</h2>
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

<style></style>
