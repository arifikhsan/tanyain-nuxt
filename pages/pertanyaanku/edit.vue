<template>
  <div>
    <form @submit.prevent="updateQuestion">
      <div class="py-4">
        <h1 class="text-2xl font-semibold text-gray-700">Edit pertanyaan</h1>
      </div>
      <label class="block">
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
      <div v-if="done">
        <nuxt-link
          class="block w-full px-4 py-2 mt-2 text-center text-white duration-500 bg-blue-500 rounded-md hover:bg-blue-600"
          :to="{ name: 'tanya-slug', params: { slug: newslug } }"
        >
          <a>Lihat pertanyaan</a>
        </nuxt-link>
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
  middleware: 'auth',
  data() {
    return {
      question: '',
      done: false,
      newslug: '',
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
                slug
              }
            }
          `,
        })
        .then((res) => {
          this.$toast.success('Sukses mengupdate pertanyaan.', {
            duration: 6000,
          })
          this.newslug = res.data.updateQuestion.slug
          this.done = true
        })
        .catch(() => {
          this.$toast.error('Gagal mengupdate pertanyaan.', {
            duration: 6000,
          })
        })
    },
  },
}
</script>
