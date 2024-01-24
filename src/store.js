import { configureStore, createSlice } from "@reduxjs/toolkit";

//다른 파일에서 slice가져오기
import user from './store/userSlice.js'

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
// 값이 너무 긴경우 별도의 파일로 관리할 수 있다.
// ./store/userSlice.js로 이동 완료


// 예제: Cart용 데이터를 꾸미고 보내보자

let items = createSlice({ 
    name: 'items',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers: {
        // 예제: Cart의 수량 그리고 수량 변경 함수를 넣어보자
        increaseCount(state, action) {
            // state.find((x) => x.id == action.payload).count++
            // findIndex를 사용해보자
            let index = state.findIndex((a) =>a.id == action.payload);
            state[index].count++;
        },
        // 0124 예제. 중복 아이템 추가 방지 기능을 추가해보자
        addItem (state, action) {
            if (state.find((a)=>a.name == action.payload.title)) {
                window.alert('아이템이 중복되었습니다.')
            } else {
                let item = { id: action.payload.id, name: action.payload.title, count: 1};
                state.push(item);
                window.alert('아이템 추가 성공')
            }   
        },
        deleteItem (state, action) {
            let index = state.findIndex((a) => a.name == action.payload);
            state.splice(index,1);
        },
    }
     
})

export let { increaseCount, addItem, deleteItem } = items.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        items: items.reducer
    }
})

