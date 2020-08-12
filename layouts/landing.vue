<template>
  <div>
    <AppHeader />
    <div>
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
