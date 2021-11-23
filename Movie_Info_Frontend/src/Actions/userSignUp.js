import axios from "axios";

// Action Creator
const userSignUp = (userName,userEmail, userPassword,userImage) => {
  return async (dispatch, getState) => {
    const url = `/user/signup`;
    const formData = new FormData();
    formData.append('name', userName);
    formData.append('email', userEmail);
    formData.append('password', userPassword);
    formData.append('userImage', userImage);
    const options = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let response = await axios.post(url,formData,options)
    if(response.data.error){
        dispatch({
            type:"SIGNUP_FAILED",
            payload:response.data.message
        })
    }else{
        dispatch({
            type:"SIGNUP_SUCCESS",
            payload:"Sign Up SuccessFull!"
        })
    }

  };
};

export default userSignUp;
