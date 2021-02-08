<template>
  <div id="container" class="w-full">
    <Header />
    <div class="md:mx-24 md:my-6 sm:mx-12 mx-6 my-4">
      <h1 class="md:text-5xl text-2xl antialiased">{{ json.title }}</h1>
      <p class="text-sm antialiased mb-6">最終更新 : {{ timestamp }}</p>
      <div v-html="json.body" id="body_wrapper"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    meta: {
      title: '',
      description: '',
      type: 'article',
      url: `https://heishi1humanity.tk/p/`,
      img: 'https://heishi1humanity.tk/face.webp',
    },
  }),
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
          meta: {
            title: 'heishi1HUMANITY-' + json.title,
            description: json.title,
            type: 'article',
            url: `https://heishi1humanity.tk/p/${context.params.id}`,
            img:
              typeof json.thumbnail === 'undefined'
                ? 'https://heishi1humanity.tk/face.webp'
                : json.thumbnail.url,
          },
        };
      });
  },
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
        { hid: 'og:image', property: 'og:image', content: this.meta.img },
      ],
    };
  },
});
</script>

<style>
#body_wrapper a {
  color: #1919bb;
  border-bottom: #1919bb 1px solid;
  word-break: break-all;
}
#body_wrapper a:hover {
  opacity: 0.7;
}
#body_wrapper pre {
  padding: 16px 32px;
  background-color: #364549;
  color: #e3e3e3;
  overflow-x: auto;
}
@media (prefers-color-scheme: dark) {
  body {
    color: rgb(247, 250, 252);
  }
  #body_wrapper a {
    color: #8585ee;
    border-bottom: #8585ee 1px solid;
  }
}
</style>
