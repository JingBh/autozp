export const state = () => ({
  isInviteVerified: false,
  userInfo: {},
  isLoggedIn: false
})

export const mutations = {
  inviteVerified (state, status) {
    state.isInviteVerified = status;
  },

  updateUserInfo (state, data) {
    state.userInfo = data;
    state.isLoggedIn = !!data;
  }
}
