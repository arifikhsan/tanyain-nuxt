<template>
  <div>
    <AppHeader />
    <nuxt />
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
