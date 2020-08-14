<template>
  <div>
    <div class="py-4">
      <h1 class="text-2xl font-bold text-gray-800">Jawabanku</h1>
    </div>
    <div class="mt-4 space-y-4 text-gray-800">
      <div v-for="answer in myAnswers" :key="answer.id">
        <div>
          <nuxt-link
            :to="{ name: 'tanya-slug', params: { slug: answer.question.slug } }"
            class="block py-2 text-xl font-semibold duration-500 hover:text-blue-500"
          >
            {{ answer.text }}
          </nuxt-link>
        </div>
        <div class="flex mt-1 space-x-2">
          <nuxt-link
            :to="{ name: 'jawabanku-edit', params: { id: answer.id } }"
            class="px-4 py-2 text-sm duration-500 rounded-md hover:bg-blue-400"
          >
            Edit
          </nuxt-link>
          <button
            @click="deleteAnswer(answer.id)"
            class="px-4 py-2 text-sm duration-500 rounded-md hover:bg-red-400"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Jawabanku',
  },
  middleware: 'auth',
  data() {
    return {
      myAnswers: '',
    }
  },
  apollo: {
    myAnswers: gql`
      query {
        myAnswers {
          id
          text
          user {
            email
          }
          question {
            id
            title
            slug
          }
        }
      }
    `,
  },
  methods: {
    async deleteAnswer(id) {
      await this.$apollo
        .mutate({
          variables: {
            id,
          },
          mutation: gql`
            mutation($id: Int!) {
              deleteAnswer(input: { id: $id }) {
                message
              }
            }
          `,
        })
        .then(() => alert('Jawaban telah dihapus.'))
        .catch(() => alert('Jawaban gagal dihapus'))
    },
  },
}
</script>
