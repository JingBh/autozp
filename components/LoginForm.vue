<template>
  <div>
    <b-button block variant="outline-primary" class="mt-3" v-if="!isLoggedIn" v-b-modal.login-modal>登录</b-button>
    <b-button block variant="outline-danger" class="mt-3" v-else v-on:click="logout">登出</b-button>
    <b-modal id="login-modal" title="登录综评系统" v-on:show="initForm">
      <template v-slot:default>
        <p>请输入<strong>综评系统</strong>的用户名和密码来登录。</p>
        <b-form>
          <b-form-group label="教育ID" label-for="inputUsername">
            <b-input type="text" id="inputUsername" placeholder="请输入教育ID"
                     minlength="8" maxlength="8" autocomplete="username" required
                     v-model="form.username" v-on:keyup.enter="submit" />
          </b-form-group>
          <b-form-group label="密码" label-for="inputPassword">
            <b-input type="password" id="inputPassword" placeholder="请输入密码"
                     autocomplete="current-password" required
                     v-model="form.password" v-on:keyup.enter="submit" />
          </b-form-group>
          <b-form-group label="验证码" label-for="inputValidateCode" v-show="validateEnabled">
            <b-input-group>
              <b-input type="text" id="inputValidateCode" placeholder="请输入验证码"
                       v-model="form.validateCode" v-on:keyup.enter="submit" />
              <b-input-group-append class="input-group-append">
                <img class="border" alt="验证码" title="验证码图片" id="loginValidateCodeImage"
                     v-bind:src="validateImage" v-on:click="throttledRefreshValidateCode" />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox value="yes" unchecked-value="no" v-model="form.remember" switch>
              允许 AutoZP 存储密码
            </b-form-checkbox>
            <b-form-text class="small text-muted"><strong>一些高级功能需要存储密码才可用</strong>，详见用户协议。</b-form-text>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox value="yes" unchecked-value="no" v-model="form.agreeTerms">
              已阅读并同意 <nuxt-link to="/terms" target="_blank">AutoZP 用户协议</nuxt-link>。
            </b-form-checkbox>
          </b-form-group>
          <p v-bind:class="loading ? 'text-info' : 'text-muted'"
             class="small mb-0">登录操作需要大约 10 秒的时间，请耐心等待。</p>
          <transition name="fadeDown">
            <p class="text-danger mb-0 mt-2" v-if="failed">登录失败：{{ failedReason }}<span></span></p>
            <p class="text-success mb-0 mt-2" v-if="succeed">登录成功！</p>
          </transition>
        </b-form>
      </template>
      <template v-slot:modal-footer="{ cancel }">
        <b-button variant="secondary" v-on:click="cancel">取消</b-button>
        <transition name="fadeRight">
          <b-button variant="primary" v-if="form.agreeTerms === 'yes'" v-bind:disabled="loading" v-on:click="submit">
            <span v-if="loading"><b-spinner small></b-spinner> 请稍候...</span>
            <span v-else>登录</span>
          </b-button>
        </transition>
      </template>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
          flag: "",
          validateCode: "",
          remember: "no",
          agreeTerms: "no"
        },
        validateEnabled: false,
        validateImage: "",
        failed: false,
        failedReason: "",
        succeed: false,
        loading: false
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn
      }
    },
    methods: {
      initForm() {
        this.refreshValidateCode()
        if (this.form.password)
          this.form.remember = "yes"
      },
      refreshValidateCode() {
        this.$axios.$get("/login/validateCode").then((data) => {
          if (data[0] === true) {
            let result = data[1]
            this.validateImage = result["image_url"]
            this.form.flag = result["flag"]
            this.validateEnabled = true
          }
        })
      },
      loginFail(message) {
        this.failed = true
        this.failedReason = message
      },
      submit() {
        this.failed = this.succeed = false
        if (this.form.agreeTerms === "yes") {
          this.loading = true
          this.$axios.$post("/login", this.form).then((data) => {
            if (data["success"] === true) {
              this.succeed = true
              this.$emit("reload")
              this.$bvModal.hide("login-modal")
            } else {
              this.loginFail(data["message"])
              if (data["redirect"] === "invite") {
                this.$store.commit("inviteVerified", false)
                this.$router.push("invite")
              } else if (data["reload"]) this.$emit("reload")
            }
          }).catch((error) => {
            alert("请求出错，请稍后重试。")
            console.error(error)
          }).finally(() => {
            this.refreshValidateCode()
            this.loading = false
          })
        } else this.loginFail("请先阅读并同意用户协议。")
      },
      logout() {
        this.$axios.$post("/logout").then(() => this.$emit("reload"))
      }
    },
    created() {
      this.throttledRefreshValidateCode = _.throttle(this.refreshValidateCode, 2000, { leading: true })
    }
  }
</script>
