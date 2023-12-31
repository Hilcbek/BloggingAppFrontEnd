import {createSlice} from '@reduxjs/toolkit'

let UserSlice = createSlice({
    name : 'user',
    initialState : {
        id : JSON.parse(localStorage.getItem("id")) || null,
        username : JSON.parse(localStorage.getItem("username")) || null,
        profile : JSON.parse(localStorage.getItem("profile")) || null,
        navigate : true,
        deleter : true
    },
    reducers : {
        LOGIN:  (state,action) => {
            state.username = action.payload.username;
            state.profile = action.payload.profile;
            state.id = action.payload.id
            localStorage.setItem("username", JSON.stringify(action.payload.username))
            localStorage.setItem("profile", JSON.stringify(action.payload.profile))
            localStorage.setItem("id", JSON.stringify(action.payload.id))
            state.navigate = action.payload.navigate
        },
        LOGOUT: (state,action) => {
            localStorage.clear()
            state.navigate = action.payload.navigate
        },
        REFRESH : (state,action) => {
            state.deleter = action.payload.deleter
        }
    }
})
export let {LOGIN,LOGOUT,REFRESH} = UserSlice.actions
export default UserSlice.reducer