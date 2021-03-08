<template>
  <div id="container">
    <Header />
    <div class="md:mx-24 md:my-8 sm:mx-12 mx-4 my-6">
      <h1 class="md:text-5xl text-3xl antialiased">{{ json.title }}</h1>
      <p class="text-sm antialiased mb-6">最終更新 : {{ timestamp }}</p>
      <div
        v-html="json.body"
        id="body_wrapper"
        class="md:text-base text-sm mb-6"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

export default Vue.extend({
  data: () => ({
    json: {},
    timestamp: '',
    hljs: hljs,
  }),
  mounted: async function () {
    const microcms = await fetch(
      `https://heishi1humanity.microcms.io/api/v1/posts/${this.$route.params.id}`,
      {
        headers: {
          'X-API-KEY': 'efc11354-3ce4-4b38-a25f-6835e5bd94bb',
        },
      }
    ).then((res: Response) => res.json());

    const makeMicrocmsData = async (obj: any): Promise<void> => {
      const timestamp: string = obj.updatedAt.split('T');
      timestamp[0].replace(/\-/g, '/');
      this.json = obj;
      this.timestamp = timestamp[0];
      return;
    };

    await makeMicrocmsData(microcms);

    this.hljs.highlightAll();
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
#body_wrapper iframe {
  max-width: 100%;
  height: 300px;
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
