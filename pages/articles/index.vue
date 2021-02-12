<template>
  <div id="container" class="w-full">
    <Header></Header>
    <div
      class="flex flex-wrap justify-center md:mx-24 sm:mx-12 mx-0 md:my-12 my-6"
    >
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
    return fetch('https://heishi1humanity.microcms.io/api/v1/posts?limit=50', {
      headers: {
        'X-API-KEY': 'efc11354-3ce4-4b38-a25f-6835e5bd94bb',
      },
    })
      .then((res: Response) => res.json())
      .then((json: Object) => {
        return { items: json };
      });
  },
  data: () => ({
    meta: {
          title: 'articles-heishi1HUMANITY',
          description: 'heishi1HUMANITYの記事',
          type: 'article',
          url: 'https://heishi1humanity.tk/articles'
        }
  }),
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description,
        },
        { hid: 'og:type', property: 'og:type', content: this.meta.type },
        { hid: 'og:title', property: 'og:title', content: this.meta.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta.description,
        },
        { hid: 'og:url', property: 'og:url', content: this.meta.url },
      ],
    };
  },
});
</script>

<style></style>
