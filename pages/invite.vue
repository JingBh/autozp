<template>
  <b-container class="my-5 text-center">
    <h1 class="mb-5"><logo /></h1>
    <b-row class="justify-content-center">
      <b-col cols="10" sm="7" md="5" lg="3">
        <b-form @submit="onSubmit">
          <b-form-group label="邀请码" label-for="inputInviteCode">
            <b-form-input type="text" id="inputInviteCode" placeholder="请输入邀请码" />
            <div class="invalid-feedback" id="invalidInviteCode">邀请码无效，请检查输入是否正确。</div>
          </b-form-group>
          <b-button block type="submit" variant="primary">提交</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    },
    name: "invite",
    head: {
      title: '验证邀请码 - AutoZP'
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
      }
    }
  }
</script>
