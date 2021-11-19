// Action Creator
const changeMessage = (message) => {
    return {
        type : "CHANGE_MESSAGE",
        payload : message
    }
}

export default changeMessage