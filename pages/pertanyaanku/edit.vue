<template>
  <div>
    <form @submit.prevent="updateQuestion">
      <label class="block">
        <span class="text-gray-700">Edit pertanyaan</span>
        <textarea
          v-model="question.title"
          class="block w-full mt-1 form-textarea"
          rows="3"
          placeholder="Tulis pertanyaan disini"
        ></textarea>
      </label>
      <div class="mt-4">
        <button
          class="block w-full px-4 py-2 text-center text-white duration-500 bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Kirim
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Edit pertanyaan',
  },
  data() {
    return {
      question: '',
    }
  },
  created() {
    this.getQuestion()
  },
  methods: {
    async getQuestion() {
      const slug = this.$route.params.slug
      const question = await this.$apollo.mutate({
        variables: {
          slug,
        },
        mutation: gql`
          mutation($slug: String!) {
            question(input: { slug: $slug }) {
              question {
                id
                title
              }
            }
          }
        `,
      })
      const result = question.data.question.question
      this.question = result
    },
    updateQuestion() {
      this.$apollo
        .mutate({
          variables: {
            slug: this.$route.params.slug,
            title: this.question.title,
          },
          mutation: gql`
            mutation($slug: String!, $title: String!) {
              updateQuestion(input: { slug: $slug, title: $title }) {
                message
              }
            }
          `,
        })
        .then(() => alert('Sukses mengupdate pertanyaan.'))
        .catch(() => alert('Gagal mengupdate pertanyaan.'))
    },
  },
}
</script>
