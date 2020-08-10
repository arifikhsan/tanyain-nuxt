<template>
  <div class="p-4">
    <div class="">
      <p class="text-3xl font-bold text-gray-800">
        {{ question.title }}
      </p>
    </div>
    <hr class="my-4" />
    <div class="mt-4 space-y-4">
      <div
        class="py-4 text-gray-800"
        :key="answer.id"
        v-for="answer in question.answers"
      >
        <p>
          {{ answer.text }}
        </p>
        <p class="mt-2">
          Dijawab oleh
          <span class="font-semibold">{{ answer.user.email }}</span>
        </p>
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
    }
  },
  async created() {
    const slug = this.$route.params.slug
    this.$nuxt.$loading.start()
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
    // console.log(result)
    this.$nuxt.$loading.finish()
  },
}
</script>
