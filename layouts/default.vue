<template>
  <div>
    <AppHeader />
    <div class="max-w-xl p-4 mx-auto">
      <nuxt />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/layouts/components/AppHeader'
export default {
  components: {
    AppHeader,
  },
}
</script>
