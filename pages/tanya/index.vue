<template>
  <div>
    <form @submit.prevent="sendQuestion">
      <div class="py-4">
        <h1 class="text-2xl font-semibold text-gray-700">
          Buat pertanyaan baru
        </h1>
      </div>
      <label class="block">
        <textarea
          v-model="question"
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
          :to="{ name: 'tanya-slug', params: { slug: slug } }"
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
    title: 'Buat pertanyaan baru',
  },
  middleware: 'auth',
  data() {
    return {
      question: '',
      done: false,
      slug: '',
    }
  },
  methods: {
    sendQuestion() {
      this.$apollo
        .mutate({
          variables: {
            question: this.question,
          },
          mutation: gql`
            mutation($question: String!) {
              createQuestion(input: { title: $question }) {
                message
                slug
              }
            }
          `,
        })
        .then((res) => {
          this.$toast.success('Sukses mengirim pertanyaan.', {
            duration: 6000,
          })
          this.slug = res.data.createQuestion.slug
          this.done = true
          this.question = ''
        })
        .catch(() => {
          this.$toast.error('Gagal mengirim pertanyaan.', {
            duration: 6000,
          })
        })
    },
  },
}
</script>
