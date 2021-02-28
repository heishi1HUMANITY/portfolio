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
      <div>
        <h2 class="md:text-lg text-base antialiased md:pb-6 pb-4">コメント</h2>
        <template v-for="(item, index) in commentData">
          <p
            class="w-full text-base border-t md:py-2 py-1"
            :class="{ 'border-b': index === commentData.length - 1 }"
            :key="index"
          >
            <span v-html="item.text"></span> <br />
            <span class="text-sm opacity-75">{{ item.timestamp }}</span>
          </p>
        </template>
        <div class="flex flex-col items-end">
          <textarea
            placeholder="テキストを入力"
            class="text-sm antialiased text-black w-full h-40 mt-4 mb-2 p-2 rounded-lg resize-none"
            v-model="comment"
          ></textarea>
          <button
            class="text-base antialiased w-auto px-6 py-1 border transition duration-300 ease-in-out border-gray-900 dark:border-white focus:outline-none hover:bg-black dark-hover:bg-white hover:text-white dark-hover:text-black"
            @click="submitComment"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import cheerio from 'cheerio';

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
    comment: '',
    commentData: [{}],
  }),
  asyncData: async function (context) {
    const microcms = await fetch(
      `https://heishi1humanity.microcms.io/api/v1/posts/${context.params.id}`,
      {
        headers: {
          'X-API-KEY': 'efc11354-3ce4-4b38-a25f-6835e5bd94bb',
        },
      }
    ).then((res: Response) => res.json());

    const makeMicrocmsData = (obj: any): object => {
      const timestamp: string = obj.updatedAt.split('T');
      timestamp[0].replace(/\-/g, '/');

      const $ = cheerio.load(obj.body);
      $('pre code').each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass('hljs');
      });
      obj.body = $.html();

      return {
        json: obj,
        timestamp: timestamp[0],
        meta: {
          title: obj.title + '-heishi1HUMANITY',
          description: `${obj.body.replace(/<(.*?)>/g, '').slice(0, 87)}...`,
          type: 'article',
          url: `https://heishi1humanity.tk/p/${context.params.id}`,
          img:
            typeof obj.thumbnail === 'undefined'
              ? 'https://heishi1humanity.tk/face.webp'
              : obj.thumbnail.url,
        },
      };
    };

    return makeMicrocmsData(microcms);
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
    submitComment: function () {
      const body = {
        text: this.comment
          .replace(/\&/g, '&amp;')
          .replace(/\'/g, '&#x27;')
          .replace(/\`/g, '&#x60;')
          .replace(/\"/, '&quot;')
          .replace(/\</g, '&lt;')
          .replace(/\>/g, '&gt;')
          .replace(/\n/g, '<br />'),
        timestamp:
          new Date().getFullYear() +
          '-' +
          new Date().getMonth() +
          1 +
          '-' +
          new Date().getDate(),
      };
      fetch(`https://portfolioserver-x6mrjtfwpq-an.a.run.app/api/v1/comments/${this.$route.params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((res: Response) => {
        if (res.ok === true) {
          this.commentData.push(body);
          this.comment = '';
        }
      });
    },
  },
  mounted: function () {
    this.canShare = typeof navigator.share !== 'undefined';
    fetch(`https://portfolioserver-x6mrjtfwpq-an.a.run.app/api/v1/comments/${this.$route.params.id}`)
      .then((res) => {
        if (res.ok === true) {
          return res.json();
        }
        this.commentData = [];
        throw new Error(res.statusText);
      })
      .then((res) => {
        res.forEach((v: any) => {
          v.text = v.text
            .replace(/\&/g, '&amp;')
            .replace(/\'/g, '&#x27;')
            .replace(/\`/g, '&#x60;')
            .replace(/\"/, '&quot;')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\n/g, '<br />');
          v.timestamp = v.timestamp.split('T')[0];
        });
        this.commentData = res;
      })
      .catch((err) => console.warn(err));
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
