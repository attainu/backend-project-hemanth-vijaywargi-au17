import axios from "axios";
import actions from ".";

// Action Creator
const userLogin = (userEmail,userPassword) => {
  return async (dispatch, getState) => {
    let userCred = {
        email : userEmail,
        password : userPassword
    }
    let response = await axios.post('/user/login',userCred)
    if(response.data.error){
        dispatch({
            type:"USER_LOGIN_FAILED",
            payload:response.data.message
        })
    }else{
        localStorage.setItem('userLoggedIn',true)
        localStorage.setItem('userToken',response.data.token)
        dispatch({
            type:"USER_LOGIN_SUCCESS",
            payload:response.data.token
        })
        dispatch(actions.getWatchlist())
    }
  }
}

export default userLogin;
