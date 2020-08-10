<template>
  <div>
    <form @submit.prevent="login">
      <label class="block">
        <span class="text-gray-700">Email</span>
        <input
          type="email"
          v-model="credential.email"
          class="block w-full mt-1 form-input"
          placeholder="Email"
        />
      </label>
      <label class="block">
        <span class="text-gray-700">Password</span>
        <input
          type="password"
          v-model="credential.password"
          class="block w-full mt-1 form-input"
          placeholder="Password"
        />
      </label>
      <div>
        <button
          class="block px-4 py-2 text-center text-white duration-500 bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
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
