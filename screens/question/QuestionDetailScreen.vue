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
        class="text-gray-800"
        :key="answer.id"
        v-for="answer in question.answers"
      >
        <p>
          {{ answer.text }}
        </p>
        <p>Dijawab oleh {{ answer.user.email }}</p>
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
    // console.log(this.$route.params.slug)
    const slug = this.$route.params.slug
    console.log(typeof slug)
    const question = await this.$apollo.mutate({
      variables: {
        id: parseInt(slug),
      },
      mutation: gql`
        mutation($id: Int!) {
          question(input: { id: $id }) {
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
    // .then((data) => console.log(data))
    const result = question.data.question.question
    this.question = result
    console.log(result)
  },
}
</script>
