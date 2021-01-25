<template>
  <div id="container" class="w-full">
    <Header></Header>
    <div class="flex flex-wrap justify-center md:mx-24 mx-12 md:my-12 my-6 gap-6">
      <template v-for="i in items.contents">
        <Card
          :key="i.id"
          :src="
            typeof i.thumbnail === 'undefined' ? '/face.webp' : i.thumbnail.url
          "
          :title="i.title"
          :id="i.id"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  asyncData() {
    return fetch('https://heishi1humanity.microcms.io/api/v1/posts', {
      headers: {
        'X-API-KEY': 'efc11354-3ce4-4b38-a25f-6835e5bd94bb',
      },
    })
      .then((res: Response) => res.json())
      .then((json: Object) => {
        return { items: json };
      });
  },
});
</script>

<style></style>
