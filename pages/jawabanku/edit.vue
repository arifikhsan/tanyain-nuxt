<template>
  <div>
    <form @submit.prevent="updateAnswer">
      <div class="py-4">
        <h1 class="text-2xl font-semibold text-gray-700">Edit jawaban</h1>
      </div>
      <label class="block">
        <textarea
          v-model="answer.text"
          class="block w-full mt-1 form-textarea"
          rows="3"
          placeholder="Tulis jawaban disini"
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
          :to="{ name: 'tanya-slug', params: { slug: answer.question.slug } }"
        >
          <a>Lihat jawaban</a>
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Edit Jawaban',
  },
  middleware: 'auth',
  data() {
    return {
      answer: '',
      done: false,
    }
  },
  created() {
    this.getAnswer()
  },
  methods: {
    async getAnswer() {
      const id = this.$route.params.id
      const answer = await this.$apollo.mutate({
        variables: {
          id,
        },
        mutation: gql`
          mutation($id: Int!) {
            getAnswer(input: { id: $id }) {
              answer {
                id
                text
                question {
                  id
                  title
                  slug
                }
              }
            }
          }
        `,
      })
      const result = answer.data.getAnswer.answer
      this.answer = result
    },
    updateAnswer() {
      this.$apollo
        .mutate({
          variables: {
            id: this.$route.params.id,
            text: this.answer.text,
          },
          mutation: gql`
            mutation($id: Int!, $text: String!) {
              updateAnswer(input: { id: $id, text: $text }) {
                message
              }
            }
          `,
        })
        .then(() => {
          alert('Sukses mengupdate jawaban.')
          this.done = true
        })
        .catch(() => alert('Gagal mengupdate jawaban.'))
    },
  },
}
</script>
