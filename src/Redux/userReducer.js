import {createSlice} from '@reduxjs/toolkit'

let UserSlice = createSlice({
    name : 'user',
    initialState : {
        id : JSON.parse(localStorage.getItem("id")) || null,
        username : JSON.parse(localStorage.getItem("username")) || null,
        profile : JSON.parse(localStorage.getItem("profile")) || null,
        navigate : true
    },
    reducers : {
        LOGIN:  (state,action) => {
            state.username = action.payload.username;
            state.profile = action.payload.profile;
            state.id = action.payload.id
            localStorage.setItem("username", JSON.stringify(action.payload.username))
            localStorage.setItem("id", JSON.stringify(action.payload.id))
            localStorage.setItem("profile", JSON.stringify(action.payload.profile))
            state.navigate = action.payload.navigate
        },
        LOGOUT: (state,action) => {
            localStorage.clear()
            state.navigate = action.payload.navigate
        }
    }
})
export let {LOGIN,LOGOUT} = UserSlice.actions
export default UserSlice.reducer