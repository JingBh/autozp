export default (context) => {
  const path = context.route.path
  if (!window || window.navigator.onLine !== false) {
    const pass = context.store.state.isInviteVerified === true
    if (!pass) {
      return context.app.$axios.$post("invite/verify")
        .then((response) => {
          const success = response === true
          if (success) {
            context.store.commit("inviteVerified", true)
            if (_.startsWith(path, "/invite")) context.redirect("/")
          } else if (!_.startsWith(path, "/invite")) context.redirect("/invite")
        }).catch((error) => {
          console.error(error)
          context.redirect("/invite")
        })
    } else if (_.startsWith(path, "/invite")) context.redirect("/")
  }
}
