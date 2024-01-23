import { configureStore, createSlice } from "@reduxjs/toolkit";

// 튜토리얼

// let user = createSlice({ //useState()와 비슷한 역할을 한다
//     name: 'user', 
//     initialState : 'kim',
// }) // { user : 'kim' } 라는 오브젝트를 출력한다

// let stock = createSlice({
//     name: 'stock', 
//     initialState : [10, 11, 12]
// })

// export default configureStore({
//     reducer: {
//         user : user.reducer,
//         stock : stock.reducer
//     }
// })

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
        items : items.reducer,
    }
})

