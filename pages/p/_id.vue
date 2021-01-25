<template>
  <div id="container" class="w-full">
    <Header />
    <div class="md:mx-24 md:my-6 sm:mx-12 mx-6 my-4">
      <h1 class="md:text-5xl text-2xl antialiased">{{ json.title }}</h1>
      <p class="text-sm antialiased mb-6">最終更新 : {{ timestamp }}</p>
      <div v-html="json.body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  asyncData(context) {
    return fetch(
      `https://heishi1humanity.microcms.io/api/v1/posts/${context.params.id}`,
      {
        headers: {
          'X-API-KEY': 'efc11354-3ce4-4b38-a25f-6835e5bd94bb',
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        const tmp = json.updatedAt.split('T');
        tmp[0].replace(/\-/g, '/');
        return {
          json: json,
          timestamp: tmp[0],
        };
      });
  },
});
</script>

<style></style>
