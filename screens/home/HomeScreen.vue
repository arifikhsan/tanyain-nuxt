<template>
  <div class="p-4">
    <div class="space-y-4">
      <p
        v-for="question in allQuestions"
        :key="question.id"
        class="text-xl font-semibold"
      >
        {{ question.title }}
      </p>
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
