// Action Creator
const userLogOut = () => {
    localStorage.removeItem('userLoggedIn')
    localStorage.removeItem('userToken')
  return {
      type:"USER_LOG_OUT"
  }
}

export default userLogOut;
