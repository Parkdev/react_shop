import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, increaseAge } from '../store/userSlice.js'
import { deleteItem, increaseCount } from '../store.js'

function Cart() {

    let userState = useSelector((state) => state.user)
    let itemsState = useSelector((state) => state.items)
    let dispatch = useDispatch()

    return (
        <div>

            {userState.name}의 장바구니 {userState.age}
            <button className='btn btn-primary' onClick={()=>{dispatch(increaseAge(100))} }> age + 1 </button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th style={{'width': '25%'}}>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemsState.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td>
                                        <button className='btn btn-success mr-3' onClick={()=>dispatch(increaseCount(item.id)) }>수량증가</button>
                                        <button className='btn btn-warning' onClick={()=>dispatch(deleteItem(item.id)) }>아이템삭제</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart