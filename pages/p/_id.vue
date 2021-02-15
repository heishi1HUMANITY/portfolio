<template>
  <div id="container" class="w-full">
    <Header />
    <div class="md:mx-24 md:my-8 sm:mx-12 mx-4 my-6">
      <h1 class="md:text-5xl text-3xl antialiased">{{ json.title }}</h1>
      <p class="text-sm antialiased mb-6">最終更新 : {{ timestamp }}</p>
      <div
        v-html="json.body"
        id="body_wrapper"
        class="md:text-base text-sm mb-6"
      ></div>
      <button
        v-if="canShare"
        class="text-base antialiased md:w-auto w-full md:px-6 md:py-1 py-2 border transition duration-300 ease-in-out border-gray-900 dark:border-white focus:outline-none hover:bg-black dark-hover:bg-white hover:text-white dark-hover:text-black"
        @click="share"
      >
        共有
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css'

export default Vue.extend({
  data: () => ({
    meta: {
      title: '',
      description: '',
      type: 'article',
      url: `https://heishi1humanity.tk/p/`,
      img: 'https://heishi1humanity.tk/face.webp',
    },
    canShare: false,
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
            title: json.title + '-heishi1HUMANITY',
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
  methods: {
    share: function () {
      navigator.share({
        title: this.meta.title,
        text: this.meta.description,
        url: this.meta.url,
      });
    },
  },
  mounted: function () {
    this.canShare = typeof navigator.share !== 'undefined';
    const tmp = document.querySelectorAll('code');
    tmp.forEach(t => {
      t.setAttribute('class', 'hljs');
      console.log('hoge');
      t.innerHTML = hljs.highlightAuto(t.innerText).value;
    });
  },
});
</script>

<style>
#body_wrapper {
  word-break: break-all;
}
#body_wrapper a {
  color: #1919bb;
  border-bottom: #1919bb 1px solid;
}
#body_wrapper a:hover {
  opacity: 0.7;
}
/* #body_wrapper pre {
  padding: 8px 16px;
  background-color: #364549;
  color: #e3e3e3;
  overflow-x: auto;
} */
#body_wrapper iframe {
  max-width: 100%;
  height: 300px;
}
/* @media (min-width: 768px) {
  #body_wrapper pre {
    padding: 16px 32px;
  }
} */
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
