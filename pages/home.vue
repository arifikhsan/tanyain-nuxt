<template>
  <div>
    <div class="py-4">
      <h1 class="text-2xl font-bold text-gray-800">Terbaru</h1>
    </div>
    <div class="mt-4 space-y-4 text-gray-800">
      <nuxt-link
        :to="{ name: 'tanya-slug', params: { slug: question.slug } }"
        v-for="question in allQuestions"
        :key="question.id"
        class="block text-xl font-semibold duration-500 hover:text-blue-500"
      >
        {{ question.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Pertanyaan Terbaru',
  },
  data() {
    return {
      allQuestions: '',
    }
  },
  apollo: {
    allQuestions: gql`
      query {
        allQuestions {
          id
          title
          slug
        }
      }
    `,
  },
}
</script>
