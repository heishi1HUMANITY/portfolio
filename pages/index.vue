<template>
  <div id="container" class="w-full">
    <Header />
    <div class="md:mx-24 sm:m-12 mx-4 my-6 flex flex-col items-start ">
      <div class="flex items-center flex-wrap mb-5">
        <div class="flex flex-col items-start justify-center">
          <h1 class="md:text-5xl mr-5 text-4xl antialiased dark:text-gray-100">heishi1HUMANITY</h1>
          <p class="text-sm antialiased dark:text-gray-100">(大西 悠太)</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <img
            src="/face.webp"
            alt="myface"
            class="sm:h-32 h-20 my-4 rounded-full"
          />
          <p class="text-xs antialiased text-gray-600 dark:text-gray-400">※素顔ではありません</p>
        </div>
      </div>
      <p class="md:text-lg text-base antialiased mb-1 dark:text-gray-100">age: {{ age }}</p>
      <p class="md:text-lg text-base antialiased mb-1 dark:text-gray-100">
        organization: Hokkaido Information University
      </p>
      <p class="md:text-lg text-base antialiased mb-1 dark:text-gray-100">
        github:
        <a
          href="https://github.com/heishi1HUMANITY"
          target="_blank"
          rel="noopener noreferrer"
          class="border-b-2 hover:opacity-50 break-all"
          >https://github.com/heishi1HUMANITY</a
        >
      </p>
      <p class="md:text-lg text-base antialiased mb-1 dark:text-gray-100">
        twitter:
        <a
          href="https://twitter.com/YutaOnishi2"
          target="_blank"
          rel="noopener noreferrer"
          class="border-b-2 hover:opacity-50 break-all"
          >https://twitter.com/YutaOnishi2</a
        >
      </p>
      <p class="md:text-lg text-base antialiased mb-6 dark:text-gray-100">
        facebook:
        <a
          href="https://www.facebook.com/i4mhuman1ty"
          target="_blank"
          rel="noopener noreferrer"
          class="border-b-2 hover:opacity-50 break-all"
          >https://www.facebook.com/i4mhuman1ty</a
        >
      </p>
      <div class="w-full h-auto flex flex-col items-start">
        <h2 class="md:text-2xl text-xl antialiased mb-4 dark:text-gray-100">language</h2>
        <template v-for="s in skills">
          <template v-if="s.type === 'lang'">
            <div class="w-full mb-2 border-b border-gray-600 dark:border-gray-100" :key="s.id">
              <p class="md:text-lg text-base antialiased mb-1 mx-4 dark:text-gray-100">
                {{ s.title }}
              </p>
              <p class="md:text-base text-sm antialiased mb-1 mx-6 dark:text-gray-100">
                {{ s.body }}
              </p>
            </div>
          </template>
        </template>
        <h2 class="md:text-2xl text-xl antialiased mb-4 dark:text-gray-100">software framework</h2>
        <template v-for="s in skills">
          <template v-if="s.type === 'framework'">
            <div class="w-full mb-2 border-b border-gray-600 dark:border-gray-100" :key="s.id">
              <p class="md:text-lg text-base antialiased mb-1 mx-4 dark:text-gray-100">
                {{ s.title }}
              </p>
              <p class="md:text-base text-sm antialiased mb-1 mx-6 dark:text-gray-100">
                {{ s.body }}
              </p>
            </div>
          </template>
        </template>
        <h2 class="md:text-2xl text-xl antialiased mb-4 dark:text-gray-100">software</h2>
        <template v-for="s in skills">
          <template v-if="s.type === 'software'">
            <div class="w-full mb-2 border-b border-gray-600 dark:border-gray-100" :key="s.id">
              <p class="md:text-lg text-base antialiased mb-1 mx-4 dark:text-gray-100">
                {{ s.title }}
              </p>
              <p class="md:text-base text-sm antialiased mb-1 mx-6 dark:text-gray-100">
                {{ s.body }}
              </p>
            </div>
          </template>
        </template>
        <h2 class="md:text-2xl text-xl antialiased mb-4 dark:text-gray-100">os</h2>
        <template v-for="s in skills" class="mb-4">
          <template v-if="s.type === 'os'">
            <div class="w-full mb-2 border-b border-gray-600 dark:border-gray-100" :key="s.id">
              <p class="md:text-lg text-base antialiased mb-1 mx-4 dark:text-gray-100">
                {{ s.title }}
              </p>
              <p class="md:text-base text-sm antialiased mb-1 mx-6 dark:text-gray-100">
                {{ s.body }}
              </p>
            </div>
          </template>
        </template>
        <h2 class="md:text-2xl text-xl antialiased mb-4 dark:text-gray-100">service</h2>
        <template v-for="s in skills">
          <template v-if="s.type === 'service'">
            <div class="w-full mb-2 border-b border-gray-600 dark:border-gray-100" :key="s.id">
              <p class="md:text-lg text-base antialiased mb-1 mx-4 dark:text-gray-100">
                {{ s.title }}
              </p>
              <p class="md:text-base text-sm antialiased mb-1 mx-6 dark:text-gray-100">
                {{ s.body }}
              </p>
            </div>
          </template>
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
      'https://heishi1humanity.microcms.io/api/v1/skills?fields=id,title,body,type&limit=20&orders=createdAt',
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
});
</script>

<style></style>
