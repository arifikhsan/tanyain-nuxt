<template>
  <div class="p-4">
    <div class="">
      <p class="text-3xl font-bold text-gray-800">
        {{ question.title }}
      </p>
    </div>
    <hr class="my-4" />
    <div class="mt-4">
      <div class="space-y-6">
        <!-- todo: add if blank -->
        <div v-if="false">
          <p>Belum ada jawaban.</p>
        </div>
        <div
          v-else
          class="text-gray-800"
          :key="answer.id"
          v-for="answer in question.answers"
        >
          <p>
            {{ answer.text }}
          </p>
          <p class="mt-3">
            Dijawab oleh
            <span class="font-semibold">{{ answer.user.email }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="py-4">
      <div v-if="this.$auth.loggedIn">
        <hr class="my-4" />
        <form @submit.prevent="sendAnswer">
          <label class="block">
            <span class="text-gray-700">Jawaban</span>
            <textarea
              v-model="answer"
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
      answer: 'aaa',
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
