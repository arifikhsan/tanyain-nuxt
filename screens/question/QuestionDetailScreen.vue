<template>
  <div class="p-4">
    <div class="space-y-4">
      <p class="text-3xl font-bold text-gray-800">
        {{ question.title }}
      </p>
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
    console.log(typeof(slug))
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
