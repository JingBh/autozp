<template>
  <b-container class="my-3 mt-md-5">
    <b-row>
      <b-col cols="auto" sm id="logoSection">
        <h1 class="mb-1"><logo /></h1>
        <p class="mb-0">一个<span class="font-weight-light mx-1">极简</span>综评系统客户端</p>
      </b-col>
      <b-col col sm="5" md="4" lg="3" xl="2">
        <login-form v-if="userInfoLoaded" v-on:reload="reload" />
      </b-col>
    </b-row>
    <hr>
    <p class="text-info" id="userInfoLoading" v-show="!userInfoLoaded">
      <b-spinner small></b-spinner>
      正在加载用户信息...
    </p>
    <div v-if="isLoggedIn">
      <user-info></user-info>
      <b-tabs class="mt-3" content-class="mt-2" lazy>
        <b-tab title="记录" disabled></b-tab>
        <b-tab title="排名" disabled></b-tab>
        <b-tab title="上传" disabled></b-tab>
        <b-tab title="计划" disabled></b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import LoginForm from '~/components/LoginForm.vue'
  import UserInfo from '~/components/UserInfo'

  export default {
    components: {
      Logo,
      LoginForm,
      UserInfo,
    },
    data() {
      return {
        userInfoLoaded: false
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn
      }
    },
    methods: {
      reload() {
        this.userInfoLoaded = false
        this.$axios.$get("user/info").then((data) => {
          this.$store.commit("updateUserInfo", data[1])
        }).finally(() => {
          this.userInfoLoaded = true
        })
      }
    },
    created() {
      this.reload()
    }
  }
</script>
