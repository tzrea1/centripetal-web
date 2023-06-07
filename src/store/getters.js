// export const showLogin = (state) => state.login.showLogin
// export const loginAction = (state) => state.login.action
// export const userInfo = (state) => state.login.userinfo
// export const scrollTop = (state) => state.scroll.scrollTop

const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    showLogin : state => state.login.showLogin,
    loginAction : state => state.login.action,
    userInfo : state => state.login.userinfo,
    scrollTop : state => state.scroll.scrollTop
}
export default getters
