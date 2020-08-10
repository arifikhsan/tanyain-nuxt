<template>
  <div class="p-4">
    <div class="space-y-4">
      <nuxt-link
        :to="{ name: 'slug', params: { slug: question.id } }"
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
        }
      }
    `,
  },
}
</script>
