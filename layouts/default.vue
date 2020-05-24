<template>
  <nuxt v-if="online" />
  <offline v-else />
</template>

<script>
  import Offline from "~/components/Offline"

  export default {
    components: {
      Offline
    },
    data() {
      return {
        online: true
      }
    },
    mounted() {
      this.online = window.navigator.onLine !== false
      if (window._checkOnlineInterval)
        window.clearInterval(window._checkOnlineInterval)
      window._checkOnlineInterval = window.setInterval(() => {
        this.online = window.navigator.onLine !== false
      }, 100)
    }
  }
</script>
