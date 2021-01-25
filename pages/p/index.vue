<template>
  <div id="container" class="w-full">
    <Header />
    <div class="md:m-24 m-12">
      <h1 class="md:text-5xl text-2xl antialiased">{{ data.title }}</h1>
      <p class="text-sm antialiased mb-6">最終更新 : {{timestamp}}</p>
      <div v-html="data.body"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  asyncData(context) {
    return fetch(
      `https://heishi1humanity.microcms.io/api/v1/posts/${context.query.id}`,
      {
        headers: {
          'X-API-KEY': 'efc11354-3ce4-4b38-a25f-6835e5bd94bb',
        },
      }
    )
      .then((res: Response) => res.json())
      .then((json) => {
        const tmp:string = json.updatedAt.split('T');
        tmp[0].replace(/\-/g, '/');
        return { data: json ,timestamp: tmp[0]}
      })
  },
})
</script>

<style></style>
