import axios from 'axios'

// Action Creator
const getTodos = () => {
    return async (dispatch,getState) => {
        let response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        dispatch({
            type:"GET_TODOS",
            payload: response.data
        })
    }
}

export default getTodos
