export default {
  saveUser({ user }) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  },
  getToken() {
    const user = this.getUser()
    return (user && user.token) || null
  },

}