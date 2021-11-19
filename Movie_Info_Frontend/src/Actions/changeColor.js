// Action Creator
const changeColor = (color) => {
    return {
        type : "CHANGE_COLOR",
        payload : color
    }
}

export default changeColor