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

<script>
import Vue from 'vue';
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
      .then((res) => res.json())
      .then((json) => {
        const tmp = json.updatedAt.split('T');
        tmp[0].replace(/\-/g, '/');
        return { json: json, timestamp: tmp[0] };
      });
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'heishi1HUMANITY',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://heishi1humanity.tk/p?id=${this.$route.query.id}`,
        },
        { hid: 'og:title', property: 'og:title', content: this.json.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.json.title,
        },
        { hid: 'og:image', property: 'og:image', content: typeof this.json.thumbnail === 'undefined' ? '/face.webp' : this.json.thumbnail.url},
        { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
      ],
    };
  },
});
</script>

<style></style>
