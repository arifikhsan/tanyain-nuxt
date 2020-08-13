<template>
  <div>
    <form @submit.prevent="sendQuestion">
      <div class="py-4">
        <h1 class="text-2xl font-bold text-gray-800">Buat pertanyaan baru</h1>
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
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Buat pertanyaan baru',
  },
  data() {
    return {
      question: '',
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
              }
            }
          `,
        })
        .then(() => alert('Sukses mengirim pertanyaan.'))
        .catch(() => alert('Gagal mengirim pertanyaan.'))
    },
  },
}
</script>
