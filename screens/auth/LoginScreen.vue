<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label>Email</label>
        <input type="email" v-model="credential.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="credential.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      credential: {
        email: 'admin@admin.com',
        password: '123456',
      },
    }
  },
  methods: {
    async login() {
      const auth = await this.$apollo.mutate({
        variables: {
          email: this.credential.email,
          password: this.credential.password,
        },
        mutation: gql`
          mutation($email: String!, $password: String!) {
            loginUser(input: { email: $email, password: $password }) {
              message
              accessToken
            }
          }
        `,
      })
      const accessToken = auth.data.loginUser.accessToken
      this.$auth.setToken('local', accessToken)
      console.log(accessToken)
      console.log(this.$auth.loggedIn)
      // try {
      //   let response = await this.$auth.loginWith('local', { data: this.login })
      //   console.log(response)
      // } catch (err) {
      //   console.log(err)
      // }
    },
  },
}
</script>
