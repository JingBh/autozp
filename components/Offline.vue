<template>
  <b-container class="my-5 text-center">
    <h1 class="mb-5"><logo /></h1>
    <h2 class="font-weight-light text-danger">无法连接服务器</h2>
    <p>请检查您的网络连接后刷新网页~</p>
  </b-container>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    }
  }
</script>
