import { configureStore, createSlice } from "@reduxjs/toolkit";

// 튜토리얼

// let stock = createSlice({ //useState()와 비슷한 역할을 한다
//     name: 'stock', 
//     initialState : [10, 11, 12] 
// }) // object 형식으로 return한다.

// export default configureStore({
//     reducer: {
//         user : user.reducer,
//         stock : stock.reducer
//     }
// })

// 값 변경함수를 넣어보자
let user = createSlice({
    name: 'user', 
    initialState : 'kim',
    // 값 변경하기 위해 추가해야하는 reducers
    reducers : {
        changeName(state) {
            return 'john ' + state
        },
        hamsu2() {}
    }
})
export let { changeName } = user.actions

// 예제: Cart의 수량 그리고 수량 변경 함수를 넣어보자
let cartCount = createSlice({
    name: 'cartCount',
    initialState: [0,0,0],
    reducers : {
        countup(state) {
            return []
        }
    }
})

// 예제: Cart용 데이터를 꾸미고 보내보자

let items = createSlice({ 
    name: 'items',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ] 
})

export default configureStore({
    reducer: {
        user: user.reducer,
        items: items.reducer
    }
})

