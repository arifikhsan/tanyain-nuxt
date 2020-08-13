<template>
  <div>
    <div class="flex items-center justify-between max-w-5xl p-4 md:mx-auto">
      <div class="pl-4">
        <nuxt-link
          v-if="$auth.loggedIn"
          class="text-2xl font-bold text-blue-500"
          to="/home"
        >
          Tanyain
        </nuxt-link>
        <nuxt-link v-else class="text-2xl font-bold text-blue-500" to="/">
          Tanyain
        </nuxt-link>
      </div>

      <!-- hamburger -->
      <div class="flex items-center -mr-2 md:hidden">
        <button
          @click="toggleNav"
          type="button"
          class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
        >
          <svg
            class="w-6 h-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div class="hidden md:block md:ml-10 md:pr-4">
        <nuxt-link
          to="/tanya"
          class="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >Buat Pertanyaan
        </nuxt-link>
        <nuxt-link
          to="/pertanyaanku"
          class="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >Pertanyaanku
        </nuxt-link>
        <nuxt-link
          to="/jawabanku"
          class="ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >Jawabanku
        </nuxt-link>
        <button
          to="/jawabanku"
          class="ml-8 font-medium text-blue-500 transition duration-150 ease-in-out bg-gray-50 focus:text-blue-700 hover:text-gray-900 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
    <div
      v-show="menu"
      class="absolute inset-x-0 top-0 transition origin-top-right transform"
    >
      <div class="rounded-lg shadow-md">
        <div
          @click="toggleNav"
          class="overflow-hidden bg-white rounded-lg shadow-xs"
        >
          <div class="flex items-center justify-between p-4">
            <div class="text-2xl font-bold text-blue-500">
              <p v-if="$auth.loggedIn">Halo, {{ $auth.user.name }}</p>
              <nuxt-link to="/" v-else>Tanyain</nuxt-link>
            </div>

            <!-- close -->
            <div class="-mr-2">
              <button
                type="button"
                class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              >
                <svg
                  class="w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="px-2 pt-2 pb-3">
            <nuxt-link
              to="/home"
              class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
            >
              Beranda
            </nuxt-link>
            <div v-if="$auth.loggedIn">
              <nuxt-link
                to="/tanya"
                class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                Buat Pertanyaan
              </nuxt-link>
              <nuxt-link
                to="/pertanyaanku"
                class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                Pertanyaanku
              </nuxt-link>
              <nuxt-link
                to="/jawabanku"
                class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
              >
                Jawabanku
              </nuxt-link>
            </div>
          </div>
          <div>
            <button
              v-if="$auth.loggedIn"
              @click="logout"
              class="block w-full px-5 py-3 font-medium text-center text-blue-500 transition duration-150 ease-in-out bg-gray-50 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:bg-gray-100 focus:text-blue-700"
            >
              Logout
            </button>
            <nuxt-link
              v-else
              to="/login"
              class="block w-full px-5 py-3 font-medium text-center text-blue-500 transition duration-150 ease-in-out bg-gray-50 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:bg-gray-100 focus:text-blue-700"
            >
              Login
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    toggleNav: function () {
      this.menu = !this.menu
    },
    async logout() {
      await this.$auth.logout()
      await this.$apolloHelpers.onLogout()
    },
  },
}
</script>
