<template>
  <div id="container" class="w-full">
    <Header />
    <div class="md:m-24 sm:m-12 m-6 flex flex-col items-start">
      <div class="flex items-center flex-wrap mb-5">
        <div class="flex flex-col items-start justify-center">
          <h1 class="md:text-5xl mr-5 text-4xl antialiased">heishi1HUMANITY</h1>
          <p class="text-sm antialiased">(大西 悠太)</p>
        </div>
        <img
          src="/face.webp"
          alt="myface"
          class="sm:h-32 h-12 my-4 rounded-full"
        />
      </div>
      <p class="md:text-lg text-base antialiased mb-1">age: {{ age }}</p>
      <p class="md:text-lg text-base antialiased mb-1">
        organization: Hokkaido Information University
      </p>
      <p class="md:text-lg text-base antialiased mb-1">
        github:
        <a
          href="https://github.com/heishi1HUMANITY"
          target="_blank"
          rel="noopener noreferrer"
          class="border-b-2 hover:opacity-50"
          >https://github.com/heishi1HUMANITY</a
        >
      </p>
      <p class="md:text-lg text-base antialiased mb-1">
        twitter:
        <a
          href="https://twitter.com/YutaOnishi2"
          target="_blank"
          rel="noopener noreferrer"
          class="border-b-2 hover:opacity-50"
          >https://twitter.com/YutaOnishi2</a
        >
      </p>
      <p class="md:text-lg text-base antialiased mb-6">
        facebook:
        <a
          href="https://www.facebook.com/i4mhuman1ty/"
          target="_blank"
          rel="noopener noreferrer"
          class="border-b-2 hover:opacity-50"
          >https://www.facebook.com/i4mhuman1ty/</a
        >
      </p>
      <div class="w-full h-auto flex flex-col items-start">
        <h2 class="md:text-2xl text-xl antialiased mb-4">skills</h2>
        <template v-for="s in skills">
          <div class="w-full mb-2 border-b border-gray-600" :key="s.id">
            <p class="md:text-lg text-base antialiased mb-1 mx-4">
              {{ s.title }}
            </p>
            <p class="md:text-base text-sm antialiased mb-1 mx-6">
              {{ s.body }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    age: () => {
      const d = new Date();
      if (d.getMonth() > 1) return d.getFullYear() - 2000;
      if (d.getMonth() === 1)
        return d.getDate() >= 28
          ? d.getFullYear() - 2000
          : d.getFullYear() - 2001;
      else return d.getFullYear() - 2001;
    },
  },
  asyncData: async () => {
    const res = await fetch(
      'https://heishi1humanity.microcms.io/api/v1/skills?fields=id,title,body,field&limit=20&orders=createdAt',
      {
        headers: {
          'X-API-KEY': 'efc11354-3ce4-4b38-a25f-6835e5bd94bb',
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
    return { skills: res.contents };
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
          content: 'https://heishi1humanity.tk/',
        },
        { hid: 'og:title', property: 'og:title', content: 'heishi1HUMANITY' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'heishi1HUMANITYのポートフォリオ（仮）',
        },
        { hid: 'og:image', property: 'og:image', content: '/face.webp' },
        { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
      ],
    };
  },
});
</script>

<style></style>
