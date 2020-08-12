<template>
  <div>
    <div class="max-w-xs p-4 mx-auto">
      <form @submit.prevent="login" class="mt-16">
        <label class="block">
          <span class="text-gray-700">Email</span>
          <input
            type="email"
            v-model="credential.email"
            class="block w-full mt-1 form-input"
            placeholder="Email"
          />
        </label>
        <label class="block mt-2">
          <span class="text-gray-700">Password</span>
          <input
            type="password"
            v-model="credential.password"
            class="block w-full mt-1 form-input"
            placeholder="Password"
          />
        </label>
        <div class="mt-4">
          <button
            class="block w-full px-4 py-2 text-center text-white duration-500 bg-blue-500 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
      await this.$auth.loginWith('local', { data: this.credential })
      if (this.$auth.loggedIn) {
        this.$store.dispatch('snackbar/setSnackbar', {
          text: 'Thank you for signing in, ' + this.$auth.user.name,
        })
        this.$router.push('/home')
      }
    },
  },
}
</script>
