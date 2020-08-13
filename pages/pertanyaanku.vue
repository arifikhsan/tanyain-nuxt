<template>
  <div>
    <div class="py-4">
      <h1 class="text-2xl font-bold text-gray-800">Pertanyaanku</h1>
    </div>
    <div class="mt-4 space-y-4 text-gray-800">
      <nuxt-link
        :to="{ name: 'tanya-slug', params: { slug: question.slug } }"
        v-for="question in questions"
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
    title: 'Pertanyaanku',
  },
  data() {
    return {
      questions: '',
    }
  },
  created() {
    this.getQuestions()
  },
  methods: {
    async getQuestions() {
      const res = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            filterQuestions(input: {}) {
              questions {
                id
                title
                slug
              }
            }
          }
        `,
      })
      this.questions = res.data.filterQuestions.questions
    },
  },
}
</script>
