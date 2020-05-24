<template>
  <b-form @submit="onSubmit">
    <b-form-group label="邀请码" label-for="inputInviteCode">
      <b-form-input type="text" id="inputInviteCode" placeholder="请输入邀请码"
                    :state="valid" v-model="code" required />
      <b-form-invalid-feedback :state="valid">邀请码无效，请检查输入是否正确。</b-form-invalid-feedback>
    </b-form-group>
    <b-button block type="submit" variant="primary">提交</b-button>
  </b-form>
</template>

<script>
  export default {
    data() {
      return {
        code: "",
        valid: null
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        this.$axios.$post("invite/verify", {
          code: this.code
        }).then((response) => {
          const success = response === true;
          this.valid = success;
          if (success) {
            this.$store.commit("inviteVerified", true)
            this.$router.push("/")
          }
        }).catch((error) => {
          console.error(error);
          alert("请求过程中发生错误。")
        })
      }
    }
  }
</script>
