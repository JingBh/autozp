export const state = () => ({
  inviteVerified: false,
  userInfo: {}
})

export const mutations = {
  inviteVerified (state) {
    state.inviteVerified = true;
  },

  updateUserInfo (state, data) {
    state.userInfo = data;
  }
}
