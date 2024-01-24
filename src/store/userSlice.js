import { createSlice } from "@reduxjs/toolkit";

// 값 변경함수를 넣어보자
let user = createSlice({
    name: 'user', 
    initialState : { name : 'kim', age : 20 },
    // 값 변경하기 위해 추가해야하는 reducers
    reducers : {
        changeName(state) {
            //직접 수정해도 무방
            state.name = 'park'
        },
        changeName2(state) {
            return 'john ' + state.name
        },
        increaseAge(state, action) {
            console.log(state);
            state.age += action.payload;
        }
    }
})

export let { changeName, increaseAge } = user.actions;

export default user;