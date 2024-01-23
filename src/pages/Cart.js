import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart() {

    let a = useSelector((state) => state.items)
    console.log(a)
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        a.map((item) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td>버튼</td>
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