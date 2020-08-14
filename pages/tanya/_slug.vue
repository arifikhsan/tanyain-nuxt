<template>
  <div>
    <div>
      <h1 class="text-3xl font-bold text-gray-800">
        {{ question.title }}
      </h1>
    </div>
    <div class="mt-4">
      <div class="py-8">
        <p class="text-2xl font-semibold text-gray-700">Jawaban</p>
      </div>
      <div class="space-y-6">
        <div
          class="text-gray-800"
          :key="answer.id"
          v-for="answer in question.answers"
        >
          <p>
            {{ answer.text }}
          </p>
          <p class="mt-3 text-sm">
            Dijawab oleh
            <span class="font-semibold">{{ answer.user.name }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="py-4">
      <div v-if="this.$auth.loggedIn">
        <form @submit.prevent="sendAnswer">
          <div class="py-8">
            <p class="text-2xl font-semibold text-gray-700">Tulis jawabanmu disini</p>
          </div>
          <label class="block">
            <textarea
              v-model="answer"
              class="block w-full mt-1 form-textarea"
              rows="3"
              placeholder="Sertakan pendapat atau sumber"
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
      <div v-else>
        <nuxt-link
          to="/login"
          class="block px-4 py-2 text-center text-white duration-500 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Login untuk menjawab
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Detail Pertanyaan',
  },
  data() {
    return {
      question: '',
      slug: '',
      answer: '',
    }
  },
  async created() {
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
                answers {
                  id
                  text
                  user {
                    id
                    name
                    email
                  }
                }
              }
            }
          }
        `,
      })
      const result = question.data.question.question
      this.question = result
    },
    async sendAnswer() {
      this.$apollo
        .mutate({
          variables: {
            questionId: this.question.id,
            answer: this.answer,
          },
          mutation: gql`
            mutation($questionId: Int!, $answer: String!) {
              createAnswer(input: { questionId: $questionId, text: $answer }) {
                message
              }
            }
          `,
        })
        .then(() => {
          alert('Sukses mengirim jawaban.')
          this.getQuestion()
        })
        .catch(() => alert('Gagal mengirim jawaban.'))
    },
  },
}
</script>
