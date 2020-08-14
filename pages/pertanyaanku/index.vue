<template>
  <div>
    <div class="py-4">
      <h1 class="text-2xl font-bold text-gray-800">Pertanyaanku</h1>
    </div>
    <div class="mt-4 space-y-4 text-gray-800">
      <div v-for="question in myQuestions" :key="question.id">
        <div>
          <nuxt-link
            :to="{ name: 'tanya-slug', params: { slug: question.slug } }"
            class="block py-2 text-xl font-semibold duration-500 hover:text-blue-500"
          >
            {{ question.title }}
          </nuxt-link>
        </div>
        <div class="flex mt-1 space-x-2">
          <nuxt-link
            :to="{ name: 'pertanyaanku-edit', params: { slug: question.slug } }"
            class="px-4 py-2 text-sm duration-500 rounded-md hover:bg-blue-400"
          >
            Edit
          </nuxt-link>
          <button
            @click="deleteQuestion(question.slug)"
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
    title: 'Pertanyaanku',
  },
  middleware: 'auth',
  data() {
    return {
      myQuestions: '',
    }
  },
  apollo: {
    myQuestions: gql`
      query {
        myQuestions {
          id
          title
          slug
        }
      }
    `,
  },
  methods: {
    async deleteQuestion(slug) {
      await this.$apollo
        .mutate({
          variables: {
            slug,
          },
          mutation: gql`
            mutation($slug: String!) {
              deleteQuestion(input: { slug: $slug }) {
                message
              }
            }
          `,
        })
        .then(() => alert('Pertanyaan telah dihapus.'))
        .catch(() => alert('Pertanyaan gagal dihapus'))
    },
  },
}
</script>
