<template>
  <b-container class="my-5 text-center">
    <h1 class="mb-5"><logo /></h1>
    <b-row class="justify-content-center">
      <b-col cols="10" sm="7" md="5" lg="3">
        <invite-code />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import InviteCode from '~/components/InviteCode.vue'

  export default {
    components: {
      Logo,
      InviteCode
    },
    head: {
      title: '验证邀请码 - AutoZP'
    }
  }
</script>
