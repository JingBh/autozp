<template>
  <b-media>
    <template v-slot:aside>
      <img id="userAvatar" alt="头像" v-bind:src="avatarUrl"
           v-bind:style="{ cursor: photoLoaded ? '' : 'pointer' }"
           v-on:error="defaultAvatar" v-on:click="requestPhoto">
    </template>
    <h3 class="my-0 font-weight-light">{{ userInfo.name }}
      <small class="font-weight-bold" style="color:deepskyblue;"
             v-if="userInfo.gender === '男'">&male;</small>
      <small class="font-weight-bold" style="color:lightpink;"
             v-if="userInfo.gender === '女'">&female;</small>
    </h3>
    <p class="my-0">{{ userInfo.school }}</p>
    <p class="my-0">分数：
      <b-spinner small variant="primary" v-if="score == null"></b-spinner>
      <span class="text-danger" v-else-if="scoreFailed">获取失败！</span>
      <strong v-else>{{ score }}</strong>
    </p>
  </b-media>
</template>

<script>
  const defaultAvatar = require("~/assets/images/defaultAvatar")

  export default {
    data() {
      return {
        avatarUrl: defaultAvatar,
        score: null,
        scoreFailed: false,
        photoLoaded: false
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn
      },
      userInfo() {
        return this.$store.state.userInfo
      }
    },
    methods: {
      getScore() {
        this.scoreFailed = false
        this.score = null
        this.$axios.$get("/user/score").then((data) => {
          if (data[1]) {
            this.score = data[1].score
          } else this.scoreFailed = true
        })
      },
      defaultAvatar() {
        this.avatarUrl = defaultAvatar
        this.photoLoaded = false
      },
      requestPhoto() {
        if (this.photoLoaded === false) {
          this.$bvModal.msgBoxConfirm("您是否同意 AutoZP 通过您的信息尝试查找您的照片？", {
            title: "隐私确认",
            okVariant: "success",
            okTitle: "同意",
            cancelTitle: "取消",
            hideHeaderClose: false
          }).then((value) => {
            if (value === true) {
              this.photoLoaded = true
              this.avatarUrl = process.env["API_URL"] + "/user/photo"
            }
          })
        }
      }
    },
    created() {
      this.getScore()
      this.defaultAvatar()
    }
  }
</script>
